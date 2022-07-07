from flask import Flask, render_template, jsonify, redirect
from flask_pymongo import PyMongo
import query
import json
from bson import BSON
from bson import json_util

app = Flask(__name__)

# Use flask_pymongo to set up mongo connection

app.config["MONGO_URI"] = "mongodb://localhost:27017/homes_db"
mongo = PyMongo(app)

@app.route("/")
def index():
    homes = mongo.db.cities.find_one()
    return render_template("index.html", homes=homes)

@app.route("/city/<city_id>")
def city(city_id):
    city = mongo.db.cities.find_one({"region_id":int(city_id)},{"_id":0})
    city_data = json.loads(json_util.dumps(city))
    return city_data

@app.route("/<city_id>/<num_homes>")
def scraper(city_id, num_homes):
    cities = mongo.db.cities
    city_data = query.query_city(city_id, num_homes)
    
    # update our db with the data that is being scraped.
    cities.insert_one(city_data)
    # return a message to our page so we know it was successful.
    return redirect("/", code=302)

if __name__ == "__main__":
    app.run(debug=True)