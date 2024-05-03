#!/usr/bin/python3
""" objects that handle all default RestFul API actions for States """
from models.state import State
from models import storage
from api.v1.views import app_views
from flask import abort, jsonify, make_response, request


@app_views.route('/states', methods=['GET'], strict_slashes=False)
def get_states():
    """
    Retrieves the list of all State objects
    """
    all_states = storage.all(State).values()
    list_states = []
    for state in all_states:
        list_states.append(state.to_dict())
    return jsonify(list_states)


@app_views.route('/states/<state_id>', methods=['GET'], strict_slashes=False)
def get_state(state_id):
    """ Retrieves a specific State """
    state = storage.get(State, state_id)
    if not state:
        abort(404)

    return jsonify(state.to_dict())


@app_views.route('/states/<state_id>',
                 methods=['DELETE'], strict_slashes=False)
def delete_state(state_id):
    try:
        state = storage.get(State, state_id)
        if not state:
            abort(404)

        storage.delete(state)
        storage.save()

        return make_response(jsonify({}), 200)
    except Exception as e:
        print(e)  # Log the exception
        abort(500)


@app_views.route('/states', methods=['POST'], strict_slashes=False)
def post_state():
    """
    Creates a State
    """
    # Check if the request content type is not 'application/json'
    if request.content_type != 'application/json':
        abort(400, description="Content-Type not json")

    # Retrieve JSON data from the request
    data = request.get_json()

    # Check if JSON data is missing or invalid
    if not data:
        abort(400, description="Request body must be in JSON format")

    # Check if 'name' field is missing in JSON data
    if 'name' not in data:
        abort(400, description="Missing 'name' field in JSON data")

    # Create a new State instance using the JSON data
    instance = State(**data)
    instance.save()

    # Return a JSON response with the created State object and 201 status code
    return make_response(jsonify(instance.to_dict()), 201)


@app_views.route('/states/<state_id>', methods=['PUT'], strict_slashes=False)
def put_state(state_id):
    """
    Updates a State
    """
    # Check if the request content type is not 'application/json'
    if request.content_type != 'application/json':
        abort(400, description="Content-Type not json")

    state = storage.get(State, state_id)

    # Check if the requested state exists
    if not state:
        abort(404, description="State not found")

    # Check if the request body is in JSON format
    if not request.is_json:
        abort(400, description="Request body must be in JSON format")

    # Get JSON data from the request
    data = request.get_json()

    # Ensure JSON data is not empty
    if not data:
        abort(400, description="Empty JSON body")

    # Fields to ignore when updating the state object
    ignore = ['id', 'created_at', 'updated_at']

    # Update state object with the provided data
    for key, value in data.items():
        if key not in ignore:
            setattr(state, key, value)

    # Save the updated state object
    storage.save()

    # Return a response with the updated state object
    return make_response(jsonify(state.to_dict()), 200)
