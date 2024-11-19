from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

MONGO_STRING = os.getenv('MONGO_STRING')
CLIENT = MongoClient(MONGO_STRING)

def mongo_client():
    return CLIENT

c = mongo_client()['testdb']
print(c)
