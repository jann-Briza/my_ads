from advertisements.domain import users_domain
from dto import LoginRequest, User, UserCreateRequest


def login(login_request: LoginRequest) -> User:
    return users_domain.login(login_request)


def create(user_create_request: UserCreateRequest) -> None:
    users_domain.create(user_create_request)
