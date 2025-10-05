import express from 'express';
import mongoose from 'mongoose';
import axios from 'axios';
import cors from 'cors'

const app = express();
app.use(cors());

const mongoURI = 'mongodb+srv://vedasree:Vedha%4018052007@cluster0.6sdzthg.mongodb.net/spaceBioEngine?retryWrites=true&w=majority'
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));
  

app.listen(3001, () => {
  console.log('Server is running on http://localhost:3001');
});