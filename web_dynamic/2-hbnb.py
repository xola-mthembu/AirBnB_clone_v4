#!/usr/bin/python3
"""
Flask web application
"""
from flask import Flask, render_template
from uuid import uuid4

app = Flask(__name__)

@app.route('/2-hbnb/')
def display_hbnb():
    """ Display the HTML page """
    return render_template('2-hbnb.html', cache_id=uuid4())

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
