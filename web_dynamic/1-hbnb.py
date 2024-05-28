#!/usr/bin/python3
""" Starts a Flash Web Application for HBNB """

# Import required modules and classes
from models import storage
from models.state import State
from models.city import City
from models.amenity import Amenity
from models.place import Place
from os import environ
from flask import Flask, render_template
import uuid

# Create a Flask web application instance
app = Flask(__name__)

# Uncomment the following lines to remove unnecessary whitespace in the HTML output
# app.jinja_env.trim_blocks = True
# app.jinja_env.lstrip_blocks = True

# Close the database connection after each request
@app.teardown_appcontext
def close_db(error):
    """ Remove the current SQLAlchemy Session """
    storage.close()

# Define a route for the HBNB web application
@app.route('/1-hbnb/', strict_slashes=False)
def hbnb():
    """ HBNB is alive! """
    # Fetch all states and sort them by name
    states = storage.all(State).values()
    states = sorted(states, key=lambda k: k.name)

    # Create a list of tuples, where each tuple contains a state and its cities
    st_ct = []
    for state in states:
        st_ct.append([state, sorted(state.cities, key=lambda k: k.name)])

    # Fetch all amenities and sort them by name
    amenities = storage.all(Amenity).values()
    amenities = sorted(amenities, key=lambda k: k.name)

    # Fetch all places and sort them by name
    places = storage.all(Place).values()
    places = sorted(places, key=lambda k: k.name)

    # Generate a new UUID for caching and pass it to the template
    return render_template('1-hbnb.html',
                           states=st_ct,
                           amenities=amenities,
                           places=places,
                           cache_id=uuid.uuid4())

# Main function
if __name__ == "__main__":
    """ Main Function """
    app.run(host='0.0.0.0', port=5000)
