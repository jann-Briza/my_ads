from typing import Iterator, Optional

from advertisements.domain import connect
from dto import Advertisement, AdvertisementRequest
from exceptions import AdvertisementDoesNotExist


def get_by_id(id: int) -> Advertisement:
    cur = connect().cursor()
    cur.execute(
        "SELECT id, key, created_by_id, category_id, title, description FROM advertisement WHERE id = %s",
        (id,),
    )
    result = cur.fetchone()

    if result is None:
        raise AdvertisementDoesNotExist

    id, key, created_by_id, category_id, title, description = result

    return Advertisement(
        id=id,
        key=key,
        created_by_id=created_by_id,
        category_id=category_id,
        title=title,
        description=description,
    )


def fetch_all(
    limit: Optional[int] = 100,
    offset: Optional[int] = 0,
    category_id: Optional[int] = None,
) -> Iterator[Advertisement]:
    cur = connect().cursor()
    if category_id is not None:
        cur.execute(
            "SELECT * FROM advertisement WHERE category_id = %s ORDER BY id DESC LIMIT %s OFFSET %s",
            (category_id, int(limit), int(offset)),
        )
    else:
        cur.execute(
            "SELECT * FROM advertisement ORDER BY id DESC LIMIT %s OFFSET %s",
            (
                limit,
                offset,
            ),
        )

    for advertisement in cur.fetchall():
        id, key, title, description, category_id, created_by_id = advertisement
        yield Advertisement(
            id=id,
            key=key,
            title=title,
            description=description,
            category_id=category_id,
            created_by_id=created_by_id,
        )


def get_count() -> int:
    cur = connect().cursor()

    cur.execute("SELECT COUNT(*) FROM advertisement")
    return cur.fetchone()[0]


def create(data: AdvertisementRequest) -> None:
    conn = connect()
    cur = conn.cursor()

    cur.execute(
        "INSERT INTO advertisement (key, created_by_id, category_id, title, description) VALUES(%s, %s, %s, %s, %s)",
        (data.key, data.created_by_id, data.category_id, data.title, data.description),
    )
    conn.commit()
    cur.close()
    conn.close()


def update(data: AdvertisementRequest, id: int) -> None:
    conn = connect()
    cur = conn.cursor()

    cur.execute(
        "UPDATE advertisement SET key = %s, category_id = %s, title = %s, description = %s WHERE id = %s",
        (data.key, data.category_id, data.title, data.description, id),
    )
    conn.commit()
    cur.close()
    conn.close()


def delete(id: int) -> None:
    conn = connect()
    cur = conn.cursor()

    cur.execute("DELETE FROM advertisement WHERE id = %s", (id,))
    conn.commit()
    cur.close()
    conn.close()
