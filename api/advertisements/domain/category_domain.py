from typing import Iterator

from advertisements.domain import connect
from dto import Category
from exceptions import CategoryDoesNotExist


def fetch_all() -> Iterator[Category]:
    cur = connect().cursor()
    cur.execute("SELECT id, name FROM category ORDER BY id DESC")

    for category in cur.fetchall():
        category_id, category_name = category
        yield Category(id=category_id, name=category_name)


def get_name_by_id(category_id: int) -> Iterator[Category]:
    cur = connect().cursor()
    cur.execute("SELECT name FROM category WHERE id = %s", (category_id,))
    result = cur.fetchone()

    if result is None:
        raise CategoryDoesNotExist

    category_name = result[0]
    return Category(name=category_name)
