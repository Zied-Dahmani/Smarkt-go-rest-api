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
import multerConfig from './middlewares/multer-config.js';

const app = express();
const port = process.env.PORT || 9090;
const databaseName = 'Smarkt-Go';


import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';


const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Smarkt GO Rest API',
    version: '1.0.0',
    description:
      'This is a REST API application made with Express for Smarkt Go',
    license: {
      name: 'Licensed Under MIT',
      url: 'https://spdx.org/licenses/MIT.html',
    },
    contact: {
      name: 'JSONPlaceholder',
      url: 'https://jsonplaceholder.typicode.com',
    },
  },
  servers: [
    {
      url: 'http://localhost:9090',
      description: 'Smarkt GO',
    },
  ],
};



const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);


app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));







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
 // .connect('mongodb+srv://zieddahmani:CsMWq2WknQjCMwaD@smarkt-go.yygbwgh.mongodb.net?retryWrites=true&w=majority')
  .then(() => {
    console.log(`Connected to ${databaseName}`);
  })
  .catch(err => {
    console.log(err);
  });
  const upload = multerConfig('image', { fileSize: 100024 * 100024 * 5 });
  app.post('/upload-image', upload, (req, res) => {
    console.log(req.file); 
    res.send({ message: 'Image uploaded successfully' });
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