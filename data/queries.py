from data import data_manager


def get_shows():
    return data_manager.execute_select('SELECT id, title FROM shows;')


def get_all_genres():
    query = 'SELECT * FROM genres;'
    return data_manager.execute_select(query)


def get_shows_by_genre(genre_id, actor_limit=20):
    query = '''
        SELECT 
            shows.title,
            ROUND(shows.rating, 1)::float as rating,
            EXTRACT(year from shows.year) as year,
            genres.name as genre,
            COUNT(actors.id) as actors_count
        FROM shows
        JOIN show_characters on shows.id = show_characters.show_id
        JOIN actors on show_characters.actor_id = actors.id
        JOIN show_genres on shows.id = show_genres.show_id
        JOIN genres on show_genres.genre_id = genres.id
        WHERE genres.id = %(genre_id)s
        GROUP BY shows.title, shows.rating, shows.year, genres.name
        HAVING COUNT(actors.id) < %(actor_limit)s;
        '''
    return data_manager.execute_select(query, {'genre_id': genre_id, 'actor_limit': actor_limit})
