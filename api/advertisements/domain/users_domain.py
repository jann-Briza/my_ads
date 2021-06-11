from advertisements.domain import connect
from dto import User, UserCreateRequest
from exceptions import AdvertisementDoesNotExist


def login(login_request) -> User:
    cur = connect().cursor()
    cur.execute(
        "SELECT id, username, name, birthday FROM users WHERE username = %s AND password = crypt(%s, password)",
        (
            login_request.username,
            login_request.password,
        ),
    )

    result = cur.fetchone()
    if result is None:
        raise AuthenticationFailed

    id, username, name, birthday = result
    return User(id=id, username=username, name=name, birthday=birthday)


def create(user_create_request: UserCreateRequest) -> None:
    conn = connect()
    cur = conn.cursor()

    cur.execute(
        "INSERT INTO users (username, name, password) VALUES(%s, %s, crypt(%s, gen_salt('bf')))",
        (user_create_request.username, user_create_request.name, user_create_request.password),
    )
    conn.commit()
    cur.close()
    conn.close()
