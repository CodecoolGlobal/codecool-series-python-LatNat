from flask import Flask, render_template, url_for, request, redirect, jsonify
from data import queries
import math
from dotenv import load_dotenv
from util import json_response

load_dotenv()
app = Flask('codecool_series')


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/shows')
@app.route('/shows/')
def all_shows():
    if request.args:
        category, order = request.args['category'], request.args['order']
    else:
        category, order = 'title', 'ASC'
    shows = queries.get_shows(category, order)
    return render_template('list.html', shows=shows, view_all=True, order=category, direction=order)


@app.route('/design')
def design():
    return render_template('design.html')


@app.route('/shows/top-rated')
@app.route('/shows/top-rated/')
@app.route('/shows/top-rated/<page>')
def top_rated(page=1):
    if request.args:
        category, order = request.args['category'], request.args['order']
    else:
        category, order = 'rating', 'DESC'
    shows = queries.get_top_rated(page, category, order)
    page_count = math.floor(queries.get_show_count()['count'] / 15)
    return render_template('list.html', shows=shows, page_count=page_count, current_page=int(page),
                           order=str(category), direction=str(order))


@app.route('/show/<show_id>')
def get_show(show_id):
    show = queries.get_show_by_id(show_id)
    seasons = queries.get_seasons_for_show(show_id)
    return render_template('details.html', show=show, seasons=seasons)


@app.route('/actors')
def get_first_hundred_actors():
    actors = queries.get_actors()
    return render_template('actors.html', actors=actors)


@app.route('/ratings')
def ratings():
    shows = queries.get_ratings()
    return render_template('ratings.html', shows=shows)


@app.route('/ordered-shows')
def ordered_shows():
    if request.args:
        order = request.args['order']
    else:
        order = 'DESC'
    shows = queries.get_ordered_ratings(order)
    return render_template('ordered_shows.html', shows=shows, direction=order)


@app.route('/fuzzy-search')
def fuzzy_search():
    return render_template('fuzzy.html')


@app.route('/api/fuzzy-search/<string:name>')
@json_response
def get_fuzzy_results(name):
    return queries.fuzzy(name)


@app.route('/api/genres', methods=['GET'])
@json_response
def get_all_genres():
    return queries.get_all_genres()


@app.route('/api/actors/<string:genre>', methods=['GET'])
@json_response
def filter_actors_by_genre(genre):
    return queries.get_actors_by_genre(genre)


@app.route('/filter-actors')
def filter_actors():
    genres = queries.get_all_genres()
    return render_template('filter.html', genres=genres)


@app.route('/birthday-actors')
def birthday_actors():
    actors = queries.get_alive_actors()
    return render_template('birthday.html', actors=actors)


@app.template_filter('convert_runtime')
def convert_runtime(runtime):
    if runtime < 60:
        return f'{runtime}m'
    else:
        hours = f'{runtime//60}h' if runtime // 60 > 0 else ''
        minutes = f'{runtime % 60}m' if runtime % 60 > 0 else ''
        return hours + ' ' + minutes


@app.template_filter('get_video_id')
def get_video_id(url):
    video_id = url[-11:]
    return video_id


@app.template_filter('convert_direction_to_arrow')
def convert(direction):
    if direction == 'ASC':
        return '⇧'
    else:
        return '⇩'


@app.template_filter('flip_direction')
def flip_direction(direction):
    return 'ASC' if direction == 'DESC' else 'DESC'


@app.template_filter('is_even')
def is_even(number):
    return int(number) % 2 == 0


def main():
    app.run(debug=True)


if __name__ == '__main__':
    main()
