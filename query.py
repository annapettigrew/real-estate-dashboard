import requests
from config import api_key
import pymongo

##########################
##### Query From API #####
##########################

conn = 'mongodb://localhost:27017'
client = pymongo.MongoClient(conn)
db = client.homes_db

def query_city(region_id, num_homes):

    url = "https://unofficial-redfin.p.rapidapi.com/properties/list"
    
    if region_id == 29470:
        city = 'Chicago'
    elif region_id == 18142:
        city = 'Tampa'
    elif region_id == 30756:
        city = 'Atlanta'
    elif region_id == 17151:
        city = 'San Francisco'
    elif region_id == 30818:
        city = 'Austin'
 
    querystring = {
		"region_id":region_id,
		"region_type":"6",
		"uipt":"1,2,3,4,7,8",
		"status":"9",
		"num_homes":num_homes,
		}

    headers = {
		"X-RapidAPI-Key": api_key,
		"X-RapidAPI-Host": "unofficial-redfin.p.rapidapi.com"
	}

    response = requests.request("GET", url, headers=headers, params=querystring)
    data = response.json()
	
    query_dict = {
        'city': city,
        'region_id': region_id,
		'response_json': data,
	}
    # db.cities.insert_one(query_dict)
	
    return query_dict

# query_city(29470,10)