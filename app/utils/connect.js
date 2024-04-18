import { MongoClient } from "mongodb";
import { decryptData } from "./encrypt";

let uri = process.env.MONGODB_URI;
uri = decryptData(uri, process.env.SEK)
const options = {
  maxPoolSize: 10,
  socketTimeoutMS: 30000,
};
let client;
let lastConnectionTime = Date.now();

async function connect() {
  const ttl = 5 * 60 * 1000;
  const isConnectionStale = Date.now() - lastConnectionTime > ttl;

  if (!client || isConnectionStale) {
    if (client) {
      await client.close();
    }

    client = new MongoClient(uri, options);
    await client.connect();
    lastConnectionTime = Date.now();
    console.log('Connected to Database on ',lastConnectionTime)
  }

  return client;
}

export default connect;
