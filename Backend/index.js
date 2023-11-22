const express = require("express");
const app = express();
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

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
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);
