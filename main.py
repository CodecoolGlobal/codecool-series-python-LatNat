from flask import Flask, render_template, url_for
from data import queries
import math
from dotenv import load_dotenv

load_dotenv()
app = Flask('codecool_series')


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/shows')
@app.route('/shows/')
def all_shows():
    shows = queries.get_shows()
    return render_template('shows.html', shows=shows)


@app.route('/design')
def design():
    return render_template('design.html')


@app.route('/shows/top-rated')
@app.route('/shows/top-rated/')
@app.route('/shows/top-rated/<page>')
def top_rated(page=1):
    shows = queries.get_top_rated(page)
    page_count = math.floor(queries.get_show_count()['count'] / 15)
    return render_template('list.html', shows=shows, page_count=page_count, current_page=int(page))


@app.route('/show/<show_id>')
def get_show(show_id):
    show = queries.get_show_by_id(show_id)
    return render_template('details.html', show=show)


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


def main():
    app.run(debug=True)


if __name__ == '__main__':
    main()
