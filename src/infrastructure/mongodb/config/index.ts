import { MongoClient } from 'mongodb';

const uri = "mongodb+srv://luis4129:5uxTTJxJDUamlbTy@startingcluster.tyjidox.mongodb.net/?retryWrites=true&w=majority&appName=StartingCluster";
const client = new MongoClient(uri);
client.connect();

export const database = client.db('pathfinder-integrated-tools');
