This is a simple web app that computes the distance between 2 airports in the US in nautical miles.

A live version of this site can be seen here: https://secure-spire-80443.herokuapp.com/

This project is essentially 2 projects combined in one.

The root of the project (everything not in the frontend folder) is the backend.

The frontend folder contains the React application which was bootstrapped using create-react-app.

The backend of this project was build with a MySQL database.

Setting up the backend.

Step 1: npm i (in the root);

Step 2: configure the .evn file in the root to be able to connect to your MySQL database.

Step 3: run npm run migrate. This assumes you have already created a database with the name you provided
in the .env. This will populate the db with the schema.

Step 4: Run npm run seed. This will seed the database with the needed data. 

Step 5: npm start

Now for the frontend.

Step 1: cd frontend 

step 2: npm i

step 3: npm start


In order for the app to work, 2 terminal windows need to be open. One in the root for the backend
and the second in frontend for the react app. Both projects need to be running at the same time.

You can then navigate to localhost:3000 and see the react app which is communicating with the backend
which is listening on port 8000. 

NOTE: All commands assume mac or linux. 
