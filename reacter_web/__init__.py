import os

from flask import Flask, render_template

def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY='dev',
        DATABASE=os.path.join(app.instance_path, 'reacter.sqlite')
    )
    
    if test_config is None:
        app.config.from_pyfile('config.py', silent=True)
    else:
        app.config.from_mapping(test_config)

    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    @app.route("/")
    # This is going to be the homepage, nothing much should have to happen here
    def homepage():
        return render_template('index.html')

    @app.route("/user/<userid>")
    # This is the user profile page
    def profile(userid):
        return render_template('profile.html', userid=userid)
    
    from . import db
    db.init_app(app)

    return app

create_app()