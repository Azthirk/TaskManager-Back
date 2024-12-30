import swaggerJsDoc from 'swagger-jsdoc';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Task Management API',
      version: '1.0.0',
      description: 'API for managing tasks',
    },
  },
  servers: [
    {
      url: process.env.MONGO_URI
    },
  ],
  apis: ['./src/swagger/info/*.ts', './src/models/*.ts'],
};

const specs = swaggerJsDoc(swaggerOptions);

export default specs;