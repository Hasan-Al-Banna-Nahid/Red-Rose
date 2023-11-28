require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
const CryptoJS = require("crypto-js");

const encryptedPublicKey =
  "U2FsdGVkX18AmdDTiq/5hrlvDdyZbgu08XRyoQOnTwYvkqIMLXRE4dcdQUrT1/f0TKWDoIvihB1LOEMBNeBSmfaQkJjKJ40CfKHjNwHEg5nJXiOoJFApwBy7tNCZHgcUOZdnngT5I2+D9H60ICFqmTS0xfoJtIhA7CD+l8J0mvGDOLgTG2WiP1KN6iD67NEfgXH8cPqoyVQ+B1tT8iUKp1bkq7YHkaHimohS1L9ak6qpRvFfHsE2d42q2pl/820gh5r+kZyHrqw5l+N2CaoSbxuJgB3l4AazSOp+qojRPJzPiVCluPb5nWkz7VEMO9Ar/k+nBbwYmqhoCX6sZWmz/IrWFZx9WtZPip8QQjJJqx8OBLc1tp7ZZle3B06FzD6LGCVljt5+lCYX2rGcBWwN8D0F+u7vGXqU073A2EZ2jlY=";
const secretKey = process.env.key;

try {
  // Decrypt the encrypted public key
  const decryptedPublicKey = CryptoJS.AES.decrypt(
    encryptedPublicKey,
    secretKey
  ).toString(CryptoJS.enc.Utf8);

  // Use the decrypted key as needed
  console.log("Decrypted Public Key:", decryptedPublicKey);
} catch (error) {
  console.error("Decryption error:", error);
}
app.get("/", (req, res) => {
  res.send("Red Rose Server Is Running");
});

app.listen(PORT, () => {
  console.log(`Server is Running At http://localhost:${PORT}`);
});

const uri =
  "mongodb+srv://iamnahid591998:dWjFW2qfE3eW1Q9d@cluster0.g04r1mb.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
    const tutorCollections = client.db("Tutor").collection("Tutor");
    app.get("/tutor/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await tutorCollections.find(query).toArray();
      res.send(result);
    });
    app.get("/tutor/", async (req, res) => {
      const result = await tutorCollections.find().toArray();
      res.send(result);
    });
    app.post("/decrypt", (req, res) => {
      const { encryptedPublicKey } = req.body;

      // Replace 'secretKey123' with the same key used for encryption on the client side
      const secretKey = "secretKeyRedRoseCorporationReactLaravel591998$$$B";

      try {
        // Decrypt the encrypted public key
        const decryptedPublicKey = CryptoJS.AES.decrypt(
          encryptedPublicKey,
          secretKey
        ).toString(CryptoJS.enc.Utf8);

        // Use the decrypted key as needed
        console.log("Decrypted Public Key:", decryptedPublicKey);

        res.status(200).json({ success: true, decryptedPublicKey });
      } catch (error) {
        console.error("Decryption error:", error);
        res.status(500).json({ success: false, error: "Decryption failed" });
      }
    });
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);
const mysql = require("mysql");

// Create a connection to the MySQL database
const connection = mysql.createConnection({
  host: "127.0.0.1", // Usually 'localhost'
  user: "root",
  password: "",
  database: "abclab_redrose",
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL database");
});
app.post("/api/sendUserData", (req, res) => {
  const { name, email, password } = req.body;

  // Insert user data into the "users" table
  const sql = "INSERT INTO users (name, email,password) VALUES (?, ?, ?)";
  connection.query(sql, [name, email, password], (error) => {
    if (error) {
      console.error("Error inserting user data:", error);
      res.status(500).send("Internal Server Error");
    } else {
      res.status(200).send("User data inserted successfully");
    }
  });
});

// Perform a simple query
// connection.query(
//   "SELECT * FROM all_classes",

//   (err, results, fields) => {
//     if (err) {
//       console.error("Error executing query:", err);
//       return;
//     }

//     // Process the query results
//     console.log("Query Results:", results);

//     // Close the connection
//     // connection.end();
//   }
// );
