import os

from flask import Flask, render_template, request, g, redirect, session, Blueprint, url_for
from .db import get_db, close_db

bp = Blueprint('auth', __name__, url_prefix='/auth')

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
        # check for cookie
        # if logged in cookie exists:
              # return feed
        # if it does not exist, do this:

    @app.route("/frontAuth", methods=['POST'])
    def handle_data():
        if request.form['submitButton'] == "login":
            # return "Logged in" + request.form['Username'] + request.form['Password'] 
            username = request.form['Username']
            password = request.form['Password']
            db = get_db()
            error = None
            user = db.execute(
                'SELECT * FROM users WHERE handle = ?', (username, )
            ).fetchone()
            print([(i[0], i[1], i[2], i[3]) for i in db.execute('SELECT * FROM users').fetchall()])
            print(user)

            if user is None:
                error = 'No user by the name.'
                return "No user by the name"
            elif user['password'] != password:
                print("i think the password is wrong")
                error = 'Wrong password.'
                return "Wrong password"

            if error is None:
                print("logged in", username, "with password", password)
                print(user)
                # session.clear()
                # session['user_id'] = user['handle']
            close_db()

        elif request.form['submitButton'] == "register":
            # return "Registered" + request.form['Username'] + request.form['Password']
            username = request.form['Username']
            password = request.form['Password']
            db = get_db()
            error = None
            user = db.execute(
                'SELECT * FROM users WHERE handle = ?', (username, )
            ).fetchone()

            if user == None:
                # session['user_id'] = user['handle']
                # just do this in javascript i guess?
                print("made a user called", username, "with password", password)
                db.execute(
                    'INSERT INTO users (handle, password, regular_name) VALUES (?, ?, ?)',
                    (username, password, username)
                )
                db.commit()
                # print([(i[0], i[1], i[2], i[3]) for i in db.execute('SELECT * FROM users').fetchall()])
                close_db()

            else:
                close_db()
                return "there is already a user by that name"

        return render_template('index.html')

    @app.route("/testingfeed")
    def feed():
        # this definitely needs to be more complicated, or maybe not(?)
        return render_template('feed.html')

    @app.route("/user/<userid>")
    # This is the user profile page
    def profile(userid):
        return render_template('profile.html', userid=userid)

    @app.route("/register", methods=['GET', 'POST'])
    def register():
        if request.method == "POST":
            # handle = request.form['username']
            # password = request.form['password']
            # so, we'll need to catch the username and password data here to put into the database
            # that's done with requests.get(index of thing) and db.execute(
            #    'INSERT INTO users (handle, password) VALUES (?, ?)',
            #    (handle, password)
            #)
            # STORING PASSWORD IN PLAIN TEXT IS BAD PRACTICE ^^^^^^
            # as well as check if that user already exists in the database
            # could this be done clientside? ^ [yes it can be, by AJAX protocol which is implementable in JavaScript]
            # all data verification stuff should be done by javascript (essentially making sure that username and password aren't empty)
            return render_template('profile.html', userid=userid)
        else:
            return render_template('register.html')

    @app.route("/post/<postid>")
    def getPost(postid):
        return render_template('post.html')
        # return render_template('post.html', postData=postData), but we need to make postData first
    
    from . import db
    db.init_app(app)

    app.register_blueprint(bp)

    return app

create_app()

@bp.before_app_request
def load_logged_in_user():
    user_id = session.get('user_id')

    if user_id is None:
        g.user = None
    else:
        g.user = get_db().execute(
            'SELECT * FROM users WHERE handle = ?', (handle,)
        ).fetchone()