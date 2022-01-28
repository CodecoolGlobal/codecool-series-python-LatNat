from data import data_manager
from psycopg2 import sql


def get_shows(category, order):
    print('inside queries:', category, order)
    query = sql.SQL('''
        SELECT
            shows.id,
            shows.title as title,
            shows.year,
            shows.runtime,
            ROUND( rating, 1 ) as rating,
            STRING_AGG( name, ', ' ORDER BY name) genres,
            COALESCE( shows.trailer, 'No URL' ) as trailer,
            COALESCE( shows.homepage, 'No URL' ) as homepage
        FROM shows
        LEFT JOIN show_genres sg on shows.id = sg.show_id
        LEFT JOIN genres g on sg.genre_id = g.id
        GROUP BY  shows.id, title, year, runtime, rating, trailer, homepage
        ORDER BY {category} {order};
        ''')
    return data_manager.execute_select(query.format(
        category=sql.Identifier(category),
        order=sql.SQL(order)))


def get_top_rated(page, category='rating', order='DESC'):
    query = sql.SQL('''
        SELECT
            shows.id,
            shows.title,
            shows.year,
            shows.runtime,
            ROUND( rating, 1 ) as rating,
            STRING_AGG( name, ', ' ORDER BY name) genres,
            COALESCE( shows.trailer, 'No URL' ) as trailer,
            COALESCE( shows.homepage, 'No URL' ) as homepage
        FROM shows
        LEFT JOIN show_genres sg on shows.id = sg.show_id
        LEFT JOIN genres g on sg.genre_id = g.id
        GROUP BY  shows.id, title, year, runtime, rating, trailer, homepage
        ORDER BY {category} {order}
        LIMIT 15
        OFFSET ({page} - 1) * 15;
        ''')
    return data_manager.execute_select(query.format(
        page=sql.Literal(page),
        category=sql.Identifier(category),
        order=sql.SQL(order)))


def get_show_by_id(show_id):
    query = '''
        SELECT title,
               runtime,
               round(rating, 1) as rating,
               genre_info.genres as genres,
               overview,
               string_agg(stars.name, ',') as stars,
               coalesce(trailer, 'No URL') as trailer
        FROM shows
        LEFT JOIN (
            SELECT show_id, string_agg(genres.name, ', ' ORDER BY genres.name) as genres
            FROM genres
            JOIN show_genres sg on genres.id = sg.genre_id
            GROUP BY show_id
            ) as genre_info on shows.id = genre_info.show_id   -- all show genres as string grouped by show --
        LEFT JOIN (
            SELECT show_id, name
            FROM actors
            JOIN show_characters sc on actors.id = sc.actor_id
            WHERE show_id = %(show_id)s
            GROUP BY show_id, name, sc.id
            ORDER BY sc.id
            FETCH FIRST 3 ROWS ONLY
            ) as stars on stars.show_id = shows.id  -- first 3 actors ordered by id grouped by show --
        GROUP BY shows.id, shows.title, shows.runtime, shows.rating, genre_info.genres, shows.overview, shows.trailer
        ORDER BY rating DESC;
            '''
    return data_manager.execute_select(query, variables={'show_id': show_id}, fetchall=False)


def get_show_count():
    query = '''
        SELECT count(id)
        FROM shows'''
    return data_manager.execute_select(query, fetchall=False)


def get_seasons_for_show(show_id):
    query = sql.SQL('''
        SELECT season_number, title, overview FROM seasons
        WHERE show_id = {show_id}
        ORDER BY season_number;
    ''')
    return data_manager.execute_select(query.format(
        show_id=sql.Literal(show_id)))


def get_actors():
    query = '''
        SELECT split_part(actors.name,' ',1) as first_name, array_agg(s.title) as shows
        FROM actors
        JOIN show_characters sc on actors.id = sc.actor_id
        JOIN shows s on s.id = sc.show_id
        GROUP BY actors.name
        LIMIT 100;
    '''
    return data_manager.execute_select(query)