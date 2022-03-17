from flask import Flask, render_template, jsonify
from data import queries
from dotenv import load_dotenv

load_dotenv()
app = Flask('codecool_series')


@app.route('/')
def index():
    shows = queries.get_shows()
    return render_template('index.html', shows=shows)


@app.route('/show-genres')
def list_all_genres():
    genres = queries.get_all_genres()
    return render_template('genres.html', genres=genres)


@app.route('/api/shows-by-genre-id/<genre_id>')
def get_shows_by_genre(genre_id):
    return jsonify(queries.get_shows_by_genre(genre_id))


def main():
    app.run(debug=True)


if __name__ == '__main__':
    main()
