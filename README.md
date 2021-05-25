## Instructions to startup
1.  CD to /frontend
`cd frontend`
2. Build the webpack files

`npm install` if you haven't already

`npm run build`

3. For development, start the frontend without webpack this will be on port **8081**

`npm run serve`

4. Go back to the home/backend directory

`cd ..`

5. Start the backend

`npm install` if you haven't

`npm run start`

This will start the server on port **8080**. Accessing the frontend files that are served up with webpack can be done by going strait to localhost:8080. (In a production env port 8081 won't be used at all.)