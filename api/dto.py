import datetime
from typing import NamedTuple


class Category(NamedTuple):
    id: int
    name: str


class Advertisement(NamedTuple):
    id: int
    key: str
    created_by_id: str
    category_id: int
    title: str
    description: str


class User(NamedTuple):
    id: int
    name: str
    username: str
    birthday: datetime.date


class AdvertisementRequest(NamedTuple):
    key: str
    created_by_id: str
    category_id: int
    title: str
    description: str


class LoginRequest(NamedTuple):
    username: str
    password: str


class UserCreateRequest(NamedTuple):
    username: str
    password: str
    name: str
