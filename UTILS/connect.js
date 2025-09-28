import { MongoClient } from "mongodb";
import { decryptData } from "./encrypt";
import crypto from "crypto";

const ENCRYPTION_KEY = crypto.createHash("sha256").update(process.env.SEK).digest();
const DECRYPTED_URI = decryptData(process.env.MONGODB_URI, ENCRYPTION_KEY);

const options = {
  maxPoolSize: 10,
  socketTimeoutMS: 30000,
};

let client;
let lastConnectionTime = 0;
const TTL = 5 * 60 * 1000; // 5 minutes

async function connect() {
  const now = Date.now();
  const isStale = !client || now - lastConnectionTime > TTL;

  if (isStale) {
    if (client) {
      try {
        await client.close();
      } catch (err) {
        console.error("Error closing stale MongoDB client:", err);
      }
    }

    try {
      client = new MongoClient(DECRYPTED_URI, options);
      await client.connect();
      lastConnectionTime = now;
      console.log("🔗 Connected to MongoDB at", new Date(lastConnectionTime).toISOString());
    } catch (err) {
      console.error("❌ Failed to connect to MongoDB:", err);
      throw err;
    }
  }

  return client;
}

export default connect;
