from flask import Blueprint, request

from advertisements.controller import advertisement_controller
from dto import AdvertisementRequest

blueprint = Blueprint("advertisement", __name__)


@blueprint.route("/advertisement/<id>")
def get(id: str):
    advertisement = advertisement_controller.get(id)
    return {
        "data": {
            "id": advertisement.id,
            "key": advertisement.key,
            "created_by_id": advertisement.created_by_id,
            "category_id": advertisement.category_id,
            "title": advertisement.title,
            "description": advertisement.description,
        }
    }, 200


@blueprint.route("/advertisement/all", methods=("GET",))
def fetch_all():
    limit = int(request.args.get("limit", 1000))
    offset = int(request.args.get("offset", 0))
    category_id = request.args.get("category_id")
    advertisements, size = advertisement_controller.fetch_all(
        limit,
        offset,
        category_id,
    )
    return {
        "data": [
            {
                "id": advertisement.id,
                "key": advertisement.key,
                "created_by_id": advertisement.created_by_id,
                "category_id": advertisement.category_id,
                "title": advertisement.title,
                "description": advertisement.description,
            }
            for advertisement in advertisements
        ],
        "size": size,
        "limit": limit,
        "offset": offset
    }, 200


@blueprint.route("/advertisement/create", methods=("POST",))
def create():
    data = request.json

    advertisement = AdvertisementRequest(
        key=data["key"],
        created_by_id=data["created_by_id"],
        category_id=data["category_id"],
        title=data["title"],
        description=data["description"],
    )
    advertisement_controller.create(advertisement)

    return {}, 201


@blueprint.route("/advertisement/update/<id>", methods=("POST",))
def update(id: str):
    data = request.json

    advertisement = AdvertisementRequest(
        key=data["key"],
        created_by_id=data["created_by_id"],
        category_id=data["category_id"],
        title=data["title"],
        description=data["description"],
    )
    advertisement_controller.update(advertisement, id)

    return {}, 200


@blueprint.route("/advertisement/delete/<id>", methods=("POST",))
def delete(id: str):
    advertisement_controller.delete(int(id))

    return {}, 200
