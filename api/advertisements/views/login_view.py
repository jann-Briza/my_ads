from flask import Blueprint, request

from advertisements.controller import login_api_controller
from dto import LoginRequest, UserCreateRequest

blueprint = Blueprint("login", __name__)


@blueprint.route("/login", methods=("POST",))
def login():
    data = request.json

    user = login_api_controller.login(
        LoginRequest(username=data["username"], password=data["password"])
    )
    return {"data": {
        "id": user.id,
        "name": user.name,
        "username": user.username,
        "birthday": user.birthday
    }}, 200


@blueprint.route("/user/create", methods=("POST",))
def create():
    data = request.json

    user = login_api_controller.create(
        UserCreateRequest(
            username=data["username"],
            password=data["password"],
            name=data["name"],
        )
    )
    return {}, 200
