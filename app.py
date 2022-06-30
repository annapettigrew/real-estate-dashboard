from flask import Flask, render_template, redirect
from flask_pymongo import PyMongo

app = Flask(__name__)

# Use flask_pymongo to set up mongo connection

app.config["MONGO_URI"] = "mongodb://localhost:27017/homes_db"
mongo = PyMongo(app)

@app.route("/")
def index():
    homes = mongo.db.homes.find_one()
    return render_template("index.html", homes=homes)

if __name__ == "__main__":
    app.run(debug=True)