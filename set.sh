#!/usr/bin/bash
# - used for setting up flask web dynamics

mkdir -p web_dynamic
cp -r web_flask/static web_flask/templates/100-hbnb.html web_flask/__init__.py web_flask/100-hbnb.py web_dynamic
mv web_dynamic/100-hbnb.py web_dynamic/0-hbnb.py
mv web_dynamic/100-hbnb.html web_dynamic/0-hbnb.html

sed -i "s#/hbnb#/0-hbnb/#g" web_dynamic/0-hbnb.py