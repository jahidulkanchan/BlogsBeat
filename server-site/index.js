const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const port = process.env.PORT || 5000;
const app = express();

// Middleware ==============
app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:5173', 'https://blogsbeat.netlify.app'],
    credentials: true,
  }),
);
app.use(cookieParser());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.4xfij.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Verify Token middleWare ============
const verifyToken = (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) return res.status(401).send({ message: 'unauthorized access' });
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'unauthorized access' });
    }
    req.user = decoded;
    next();
  });
};

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection
    const blogsCollection = client.db('Blogs_DB').collection('blogs');
    const wishlistCollection = client.db('Blogs_DB').collection('wishlist');
    const commentsCollection = client.db('Blogs_DB').collection('comments');

    // create jwt token ===========
    app.post('/jwt', async (req, res) => {
      const email = req.body;
      // create a token ====
      const token = jwt.sign(email, process.env.SECRET_KEY, { expiresIn: '1d' });
      res
        .cookie('token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        })
        .send({ success: true });
    });

    // clear token from cookie ================
    app.post('/logout', async (req, res) => {
      res
        .clearCookie('token', {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        })
        .send({ success: true });
    });

    app.get('/all-blogs', async (req, res) => {
      const page = parseInt(req.query.page);
      const size = parseInt(req.query.size);
      const filter = req.query.category;
      const search = req.query.search;
      const recentBlog = req.query.recentBlog === 'true';
      const features = req.query.features === 'true';
      let query = {};
      if (search) {
        query.title = { $regex: search, $options: 'i' };
      }
      if (filter) {
        query.category = filter;
      }
      let result;
      if (recentBlog) {
        result = await blogsCollection.find(query).sort({ addDate: -1 }).limit(6).toArray();
      } else if (features) {
        result = await blogsCollection.find(query).sort({ descLength: -1 }).limit(10).toArray();
      } else {
        result = await blogsCollection
          .find(query)
          .skip(size * page)
          .limit(size)
          .toArray();
      }

      res.send(result);
    });
    app.get('/blog/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await blogsCollection.findOne(query);
      res.send(result);
    });
    app.post('/add-blog', verifyToken, async (req, res) => {
      const data = req.body;
      const email = req.query?.email;
      const decodedEmail = req.user?.email;
      if (decodedEmail !== email) {
        return res.status(401).send({ message: 'unauthorized access' });
      }
      const result = await blogsCollection.insertOne(data);
      res.send(result);
    });
    let storeEmail = null;
    app.get('/valid-user', verifyToken, (req, res) => {
      const { email } = req.query;
      const decodedEmail = req.user?.email;
      if (email) {
        if (decodedEmail !== email) {
          return res.status(401).send({ message: 'unauthorized access' });
        } else {
          storeEmail = email;
          res.send({ email: storeEmail });
        }
      } else {
        res.send({ message: 'Email parameter is required!' });
      }
    });
    app.get('/update-blog/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await blogsCollection.findOne(query);
      res.send(result);
    });
    app.patch('/update-blog/:id', verifyToken, async (req, res) => {
      const id = req.params.id;
      const email = req.query.email;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updateBlog = req.body;
      const blog = {
        $set: {
          title: updateBlog.title,
          photo: updateBlog.photo,
          category: updateBlog.category,
          shortDesc: updateBlog.shortDesc,
          longDesc: updateBlog.longDesc,
          descLength: updateBlog.descLength,
          addDate: updateBlog.addDate,
        },
      };
      const decodedEmail = req.user?.email;
      if (decodedEmail !== email) {
        return res.status(401).send({ message: 'unauthorized access' });
      }
      const result = await blogsCollection.updateOne(filter, blog, options);
      res.send(result);
    });

    // Wishlist collection =============
    app.post('/wishlist', verifyToken, async (req, res) => {
      const data = req.body;
      const email = req.query?.email;
      const decodedEmail = req.user?.email;
      if (decodedEmail !== email) {
        return res.status(401).send({ message: 'unauthorized access' });
      }
      const { id, ownerEmail } = data;
      const filter = {
        id,
        ownerEmail,
      };
      const alreadyExist = await wishlistCollection.findOne(filter);
      if (alreadyExist) {
        return res.send({ message: 'This blog is already in your wishlist' });
      }
      const result = await wishlistCollection.insertOne(data);
      res.send(result);
    });
    app.get('/wishlist/:email', verifyToken, async (req, res) => {
      const email = req.params.email;
      const filter = { ownerEmail: email };
      const decodedEmail = req.user?.email;
      if (decodedEmail !== email) {
        return res.status(401).send({ message: 'unauthorized access' });
      }
      const result = await wishlistCollection.find(filter).toArray();
      res.send(result);
    });
    app.delete('/wishlist/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await wishlistCollection.deleteOne(query);
      res.send(result);
    });
    // All commnets ==========
    app.post('/comments', verifyToken, async (req, res) => {
      const data = req.body;
      const email = req.query?.email;
      const decodedEmail = req.user?.email;
      if (decodedEmail !== email) {
        return res.status(401).send({ message: 'unauthorized access' });
      }
      const result = await commentsCollection.insertOne(data);
      res.send(result);
    });
    app.get('/comments/:id', async (req, res) => {
      const id = req.params.id;
      const query = { id };
      const result = await commentsCollection.find(query).toArray();
      res.send(result);
    });
    // await client.db("admin").command({ ping: 1 });
    console.log('Pinged your deployment. You successfully connected to MongoDB!');
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('This server is ready vercel');
});
app.listen(port, () => {
  console.log('This server is listening', port);
});
