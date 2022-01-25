from flask import Flask, render_template, url_for
from data import queries
import math
from dotenv import load_dotenv

load_dotenv()
app = Flask('codecool_series')


@app.route('/')
def index():
    shows = queries.get_shows()
    return render_template('index.html', shows=shows)


@app.route('/design')
def design():
    return render_template('design.html')


@app.route('/shows/top-rated')
def top_rated():
    shows = queries.get_top_rated()
    return render_template('list.html', shows=shows)


@app.route('/shows/<show_id>')
def get_show(show_id):
    return render_template('index.html')


def main():
    app.run(debug=True)


if __name__ == '__main__':
    main()
