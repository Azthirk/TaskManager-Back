import dotenv from 'dotenv';
import express from 'express';
import routes from './routes';
import mongoose from 'mongoose';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import specs from './swagger/options';

// Load the environment variables
dotenv.config();

// Create an Express instance
const app = express();
const port = parseInt(process.env.PORT as string, 10) || 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017')
.then(() => console.log("Connected to the database"))
.catch((err ) => console.log("Error connecting to the database", err));

// Middleware to allow requests from other domains (CORS)
app.use(cors());

// Middleware to parse the request body as JSON
app.use(express.json());

// Use the defined routes
app.use('/api', routes);

// Use SwaggerUi
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Start the server
app.listen(port, () => {
 console.log(`Server running on ${process.env.MONGO_URI}`);
});