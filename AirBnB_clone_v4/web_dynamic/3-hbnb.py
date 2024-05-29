#!/usr/bin/python3
""" Starts a Flash Web Application """
from models import storage
from flask import Flask, render_template
from api.v1.views import app_views
from flask_cors import CORS
import uuid

app = Flask(__name__)
app.register_blueprint(app_views)
CORS(app, resources={r"/api/v1/*": {"origins": "*"}})

# Add the new route for 3-hbnb
@app.route('/3-hbnb', strict_slashes=False)
def hbnb():
    """ HBNB is alive! """
    cache_id = uuid.uuid4()
    return render_template('3-hbnb.html', cache_id=cache_id)

@app.teardown_appcontext
def close_db(error):
    """ Close Storage """
    storage.close()

if __name__ == "__main__":
    """ Main Function """
    app.run(host='0.0.0.0', port=5000)