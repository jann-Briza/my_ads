import http

import flask

from advertisements.controller import category_controller

blueprint = flask.Blueprint("category", __name__)


@blueprint.route("/category", methods=("GET",))
def get():
    return {
        "data": [
            {
                "id": category.id,
                "name": category.name,
            }
            for category in category_controller.fetch_all()
        ]
    }, 200
