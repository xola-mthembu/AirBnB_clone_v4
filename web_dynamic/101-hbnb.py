#!/usr/bin/python3
""" Starts a Flash Web Application """
from models import storage
from flask import Flask, render_template
from uuid import uuid4
from os import getenv

app = Flask(__name__)
app.url_map.strict_slashes = False


@app.teardown_appcontext
def close_db(error):
    """ Close storage """
    storage.close()


@app.route('/101-hbnb/')
def hbnb():
    """ HBNB """
    cache_id = uuid4()
    return render_template('101-hbnb.html', cache_id=cache_id)


if __name__ == "__main__":
    host = getenv('HBNB_API_HOST', '0.0.0.0')
    port = getenv('HBNB_API_PORT', '5000')
    app.run(host=host, port=port, debug=True)
