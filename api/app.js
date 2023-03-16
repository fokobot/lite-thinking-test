const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
require('dotenv').config();
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 4000;

app.use(cors({
  origin: ["http://localhost:5173", "http://lite-thinking-client-test-fo.s3-website-us-east-1.amazonaws.com"]
}));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.qxwrl.mongodb.net/docker-db?retryWrites=true&w=majority`;
mongoose.connect(uri,
  { useNewUrlParser: true, useUnifiedTopology: true }
)
  .then(() => console.log('Base de datos conectada'))
  .catch(error => console.log('Error en DB: ', error));

const authRoutes = require('./routes/authRouter');
const productRoutes = require('./routes/productRouter');
const enterpriseRoutes = require('./routes/enterpriseRouter');
const verifyToken = require('./middlewares/validate-token');

app.use('/user', authRoutes);
app.use('/products', verifyToken, productRoutes);
app.use('/enterprises', verifyToken, enterpriseRoutes);
app.get('/', (req, res) => {
  res.send('Home Route');
});

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}, http://localhost:${PORT}`)
);