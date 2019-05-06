import os

from flask import Flask, render_template, request

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
        # check for cookie
        # if logged in cookie exists:
              # return feed
        # if it does not exist, do this:
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

    return app

create_app()