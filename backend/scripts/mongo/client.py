from pymongo import MongoClient

def mongo_client():
    return MongoClient("mongodb+srv://testdb:testdb@cluster0.wblz5ep.mongodb.net/")
