# Reacter
A microblogging service, built on ReactJS and Flask. 

## How to Edit
I recognize that this has quickly become a humongous project, but there are only a couple files actually worth looking at. They are:
- `reacter_web/templates/`
  - This folder holds all of the HTML files, all your HTML work will happen here. Any new HTML files should go in this directory.
- `reacter_web/static/`
  - All static files go here, that includes CSS, JS, anything that's not HTML. I've already set up links between the templates files and the respective static files, so don't worry about that, stuff should just work. As of writing this, I haven't created any JavaScript scripts, but I have already included React dependencies inside all the HTML, so any React you write will just work. In order to link to this from within an HTML, since we're using Flask, you'll have to use `href="{{ url_for('static', filename='file.js') }}"` as opposed to the traditional `href='static/file.js'`. It's a whole thing, I know. Such is the price of making Reacter.
- `__init__.py`
  - This project has a really bad file structure which isn't right, and you should **never** have a whole bunch of things inside the `__init__.py` file. Well, we do, and I'll try to fix this soon. Anyways, for the time being, `__init__.py` is where all the Flask code is and you're welcome to take a look around and change things.

## How to Use
- In order to run this, you've gotta have Flask, and it all runs in a virtual environment. For first time setup, be sure to install Flask. This is the command you have to run in order to get it running on your local machine, while in the directory with `__init__.py`. Eventually, I'll get a virtual machine to run this on so you don't have to worry about running it yourself. 
```
FLASK_APP=__init__.py flask run
```

### If you can't get it working
well sucks i don't even know how to get it working either lol