# Backend - Task Management API

This project is the backend for a task management application that provides endpoints for creating, editing, deleting, and querying tasks.

## Link to the Deployed Application
You can access the deployed API at the following link: -

## Local Installation and Execution

Follow these steps to install and run the project in your local environment:

### 1. Clone the repository
```bash
# Clone the repository
$ git clone <REPOSITORY_URL>(https://github.com/Azthirk/TaskManager-Back.git)
$ cd back
```

### 2. Install dependencies
Make sure you have `Node.js` installed (recommended: version 16 or higher). Then, install the dependencies by running:
```bash
$ npm install
```

### 3. Set Environment Variables
Create a `.env` file in the root directory of the project. Make sure to include the following variables:
```
PORT=27017
DATABASE_URL=<DATABASE_URL>
```

### 4. Run the API
Start the server with the following command:
```bash
$ npx tsc && node dist/server.js
```
This will start the API at [http://localhost:27017](http://localhost:27017).

## Main Endpoints
The main endpoints available are:
- `GET api/tasks`: Gets a list of tasks.
- `POST api/tasks`: Creates a new task.
- `GET api/tasks/:id`: Gets an existing task.
- `PUT api/tasks/:id`: Updates an existing task.
- `DELETE api/tasks/:id`: Deletes a task.
- `SWAGGER /api-docs`: Swagger endpoints.

## Technologies Used
- **Node.js**: Runtime environment for JavaScript in the backend.
- **Express**: Web framework for Node.js.
- **Express-validators**: Library for data validation in Express applications.
- **Typescript**: Language used.
- **MongoDB**: NoSQL database.

## Available Scripts
In the `package.json` file, you will find several scripts that you can run:
- `run`: Builds and starts the server.
- `start`: Starts the server.
- `build`: Builds the server.

## Folder Structure
- `src/`: Contains all the source code for the project.
-   `src/controllers/`: Logic for handling requests.
-   `src/models/`: Definitions of schemas and data models.
-   `src/routes/`: Definition of routes and endpoints.
-   `src/swagger/`: Swagger.