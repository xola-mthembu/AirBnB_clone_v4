#!/usr/bin/python3
""" Index """
import sys
sys.path.append('/AirBnB_clone_v3')
import models
from models.amenity import Amenity
from models.city import City
from models.place import Place
from models.review import Review
from models.state import State
from models.user import User
from models import storage
from api.v1.views import app_views
from flask import jsonify


@app_views.route('/status', methods=['GET'], strict_slashes=False)
def status():
    """ Status of API """
    return jsonify({"status": "OK"})


@app_views.route('/stats', methods=['GET'], strict_slashes=False)
def number_objects():
    try:
        classes = [Amenity, City, Place, Review, State, User]
        names = ["amenities", "cities", "places", "reviews", "states", "users"]

        num_objs = {}
        for i in range(len(classes)):
            num_objs[names[i]] = storage.count(classes[i])

        return jsonify(num_objs)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
