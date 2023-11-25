from pymongo import MongoClient
# import environ

# env = environ.Env()
# environ.Env.read_env()

# mongo_string = env('MONGO_STRING')

mongo_string = "mongodb+srv://testdb:testdb@cluster0.wblz5ep.mongodb.net/"

def mongo_client():
    return MongoClient(mongo_string)
