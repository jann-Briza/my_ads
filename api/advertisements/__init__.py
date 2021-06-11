from flask import Flask

from advertisements.views import advertisement_view, category_view, login_view

__version__ = "0.1.0"


application = Flask(__name__, static_folder=None)
application.register_blueprint(advertisement_view.blueprint)
application.register_blueprint(category_view.blueprint)
application.register_blueprint(login_view.blueprint)
