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
            LIMIT 15;
        '''
    return data_manager.execute_select(query)


def get_show_by_id(show_id):
    query = '''
            SELECT
                shows.title,
                shows.runtime,
                ROUND( rating, 1) as rating,
                STRING_AGG( DISTINCT g.name, ',' ORDER BY g.name) genres,
                COALESCE( shows.trailer, 'No URL' ) as trailer,
                COALESCE( shows.homepage, 'No URL' ) as homepage,
                shows.overview,
                STRING_AGG( DISTINCT stars.name, ', ' ) as stars
            FROM shows
            INNER JOIN (
                SELECT actors.id, actors.name, sc.show_id
                FROM actors
                INNER JOIN show_characters sc on actors.id = sc.actor_id
                ORDER BY sc.id
                FETCH FIRST 3 ROWS ONLY
                ) as stars
                ON show_id = shows.id
            INNER JOIN show_characters sc on shows.id = sc.show_id
            INNER JOIN show_genres sg on shows.id = sg.show_id
            INNER JOIN genres g on sg.genre_id = g.id
            WHERE shows.id = %(show_id)s
            GROUP BY title,  runtime, rating, trailer, homepage, overview;
            '''
    return data_manager.execute_select(query, variables={'show_id': show_id}, fetchall=False)
