## Pre-setup

### Database setup

First thing is that you need mysql server running on your machine on the default port. Keep in mind the connection info (user/password/host location)

Create a database on the server

`mysql -u root -p`

`create database pick_a_database_name;`

Now create a .env file in the root directory, it'll need the following attributes

    DB_HOST=localhost

    DB_USER=name (good chance this is root)

    DB_PASS=a_password_you_setup

    DB_NAME=db_name  (The one you created in the last step)

Create a 2nd .env file IN THE /FRONTEND DIRECTORY

    VUE_APP_API_URL=localhost

    VUE_APP_API_PORT=8080

## Instructions to startup (assuming starting in root dir)
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



## Nice to know stuff
how to kill a specific port when your shit crashes

`sudo fuser -k 8080/tcp`

Connect to mysql in terminal

`mysql -u root -p`

If your db is in a docker container connect to it's bash terminal first

`docker exec -it some-mysql bash`
