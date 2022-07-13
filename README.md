## TECH CITY REAL ESTATE
Github Repository: https://github.com/annapettigrew/project-02-group-06 <br />  

### Collaborators

- Anna Pettigrew: 
    - github username: annapettigrew
- Tyler Hill: 
    - github username: tylerhill122
- Prak Bagavatula 
    - github username: Prakb2401
- Phil Faulkner: 
    - github username: phfaulkner


## DESCRIPTION

For this analysis, we utilized an api to gather the real estate data from https://rapidapi.com/apidojo/api/unofficial-redfin/

We chose to examine real estate data from the popular site redfin. Our initial interest was to particularly examine real estate prices in large tech cities to compare with the nation's average.

Information included on the final includes:
- A graph of price by time on market
- A leaflet map with pins showing location of the homes
- A map of time on the market represented by blue circles
- A map of prices represented by red circles
- A list of facts about the chosen city which includes:
    - Median Price compared with the National Average
    - Mean Price
    - Mean Beds 
    - Mean Baths
    - Mean sqft


## Coding Approach

We created a Python/Flask-powered API to pull our queries from the Unofficial Redfin API and insert the results into a MongoDB database. From there, we created our interactive dashboard to visually explore the results.

## Observations

- Chicago was surprisingly lower than the National Average home price.
- SanFrancisco was almost triple the National Average.
