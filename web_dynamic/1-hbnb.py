from flask import Flask, render_template
import uuid
import os
from models import storage  # Assuming you have a storage module to handle data retrieval

app = Flask(__name__)

@app.route('/1-hbnb/')
def hbnb():
    cache_id = uuid.uuid4()
    states = storage.all("State").values()  # Retrieve all states
    amenities = storage.all("Amenity").values()  # Retrieve all amenities
    places = storage.all("Place").values()  # Retrieve all places
    return render_template('1-hbnb.html', cache_id=cache_id, states=states, amenities=amenities, places=places)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)