from data import data_manager


def get_shows():
    return data_manager.execute_select('SELECT id, title FROM shows;')


def get_top_rated():
    query = '''
            SELECT
                shows.id,
                shows.title,
                shows.year,
                shows.runtime,
                ROUND( rating, 1) as rating,
                STRING_AGG( name, ',' ORDER BY name) genres,
                COALESCE( shows.trailer, 'No URL' ) as trailer,
                COALESCE( shows.homepage, 'No URL' ) as homepage
            FROM shows
            INNER JOIN show_genres sg on shows.id = sg.show_id
            INNER JOIN genres g on sg.genre_id = g.id
            GROUP BY  shows.id, title, year, runtime, rating, trailer, homepage
            ORDER BY shows.rating DESC
            FETCH FIRST 15 ROWS ONLY;
        '''
    return data_manager.execute_select(query)


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
        JOIN (
            SELECT show_id, string_agg(genres.name, ',') as genres
            FROM genres
            JOIN show_genres sg on genres.id = sg.genre_id
            GROUP BY show_id
            ) as genre_info on shows.id = genre_info.show_id
        JOIN (
            SELECT show_id, name
            FROM actors
            JOIN show_characters sc on actors.id = sc.actor_id
            WHERE show_id = %(show_id)s
            GROUP BY show_id, name, sc.id
            ORDER BY sc.id
            FETCH FIRST 3 ROWS ONLY
            ) as stars on stars.show_id = shows.id
        GROUP BY shows.id, shows.title, shows.runtime, shows.rating, genre_info.genres, shows.overview, shows.trailer
        ORDER BY rating DESC;
            '''
    return data_manager.execute_select(query, variables={'show_id': show_id}, fetchall=False)
