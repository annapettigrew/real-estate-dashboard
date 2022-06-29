import requests
from config import api_key

url = "https://unofficial-redfin.p.rapidapi.com/properties/list"

querystring = {"region_id":"30749","region_type":"6","uipt":"1,2,3,4,7,8","status":"9","sf":"1,2,3,5,6,7","num_homes":"50"}

headers = {
	"X-RapidAPI-Key": api_key,
	"X-RapidAPI-Host": "unofficial-redfin.p.rapidapi.com"
}

response = requests.request("GET", url, headers=headers, params=querystring)

print(response.text)