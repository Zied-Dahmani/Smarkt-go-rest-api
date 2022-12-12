import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';

import userRoutes from './routes/user.js';
import supermarketRoutes from './routes/supermarket.js';
import itemRoutes from './routes/item.js';
import orderRoutes from './routes/order.js';
import ticketRoutes from './routes/ticket.js';
import reviewRoutes from './routes/review.js';

import { errorHandler, notFoundError } from './middlewares/error-handler.js';

const app = express();
const port = process.env.PORT || 9090;
const databaseName = 'Smarkt-Go';

app.use(express.json());


app.use((req,res,next)=> {
  console.log("Middleware just ran!")
  next()
});

app.use("gse/",(req,res,next)=> {
  console.log("Middleware just ran on gse route!")
  next()
});

mongoose.set('debug', true);
mongoose.Promise = global.Promise;

mongoose
  .connect(`mongodb://localhost:27017/${databaseName}`)
  //.connect(`mongodb://mongo:zSj3YLDdEQN1EJYRyIPq@containers-us-west-96.railway.app:7213`)
  .then(() => {
    console.log(`Connected to ${databaseName}`);
  })
  .catch(err => {
    console.log(err);
  });

app.use(morgan("dev"));
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use('/img',express.static('public/images'));

app.use('/user', userRoutes);
app.use('/supermarket', supermarketRoutes);
app.use('/item', itemRoutes);
app.use('/order', orderRoutes);
app.use('/ticket', ticketRoutes);
app.use('/review', reviewRoutes);


app.use(errorHandler);
app.use(notFoundError);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});