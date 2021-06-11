import psycopg2

import config


def connect():
    conn = psycopg2.connect(
        host=config.DATABASE_HOST,
        port=config.DATABASE_PORT,
        database=config.DATABASE,
        user=config.DATABASE_USER,
        password=config.DATABASE_PASSWORD,
    )
    return conn
