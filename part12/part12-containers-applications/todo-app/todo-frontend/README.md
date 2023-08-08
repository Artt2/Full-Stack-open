# React application

This application is created from create-react-app.

Install dependencies with `npm install`

You can run the application in development mode with `npm start`

You can build static files for production release with `npm run build`

You can run tests with `npm run test`

## Environment variables

Use REACT_APP_BACKEND_URL to set where the backend for this application is.

# Run in container

Build the frontend with **docker build -f ./dev.Dockerfile -t todo-frontend-con .**.
Start the frontend containers with **docker compose -f docker-compose.dev.yml up -d** and start the frontend with **docker run -p 5000:3000 -v "$(pwd):/usr/src/app/" todo-frontend-con**.

The frontend will start on port 5000, and will use the backend url set in the .env file. 