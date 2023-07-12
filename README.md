### About the project

This is Kwan Lee's solution to the IS24 Full Stack Developer Technical Test. Thank you very much for considering my application for the position.


### Instructions for running on a local machine

1. Requirements:
	* Please make sure your machine is connected to the internet.
	* Please make sure your machine has Docker Engine version `>=24.0.0` and Docker Compose version `>=2.7.0` installed.
	* Docker Engine (the Docker daemon) must be running on your machine.

2. Download my submission. It is a zip archive. Please extract it.

3. Open a Terminal/PowerShell/CMD and navigate to the extracted folder (bc-public-service-technical-test).

4. From `bc-public-service-technical-test/`, run the following commands:

	* Builds the Python API Docker image using the Dockerfile in `./python-api`. Please wait unit the image is built.
		```sh
		docker build -t python-api python-api
		```
		
	* Builds the React frontent application using the Dockerfile in `./react-frontend`. Please wait unit the image is built.
		```sh
		docker build -t react-frontend react-frontend
		```

	* Runs the above containers and a MariaDB container pulled from Docker Hub. Please wait until you see the message "Server is running on port 3000".
		```sh
		docker compose up
		```

5. The React frontend application can now be accessed by browsing to http://localhost:3000


### Software used

* Database
	* MariaDB v10.11
* API
	* Python v3.10
	* Flask v2.3: API framework for Python
	* Gunicorn v20.1: HTTP server for Flask API
* Frontend
	* Node.js v18.16
	* NPM v9.5
	* React v18.2: Declarative JavaScript library
	* Create React App (react-scripts) v5.0: Development tool used to create SPAs (single page applcation) with React
	* React Router v6.14: Library that gives routing functionality to React SPAs
	* Redux v8.1: Global state library for React. Useful when using the SPA with a router, as it keeps the code cleaner when needing to hoist state above the routes.
	* MUI (Material UI) v5.13: User interface framework for styling React components
	* Formik v2.4: Library for working with forms in React
	* Yup v1.2: Library for validating form user inputs
	* Virtuoso v4.3: Library for creating React table components
	* Express v4.18: A Node.js server used to serve the bundled React app to the browser


### Additional notes

* Database
	* The database is seeded by the file in `dbseed/`
	* The database is persisted by the Docker volume, which will be created in `dbfiles` once container first runs.
* API
	* Source code for the API component is inside `python-api/`.
	* `main.py` is the entrypoint. It defines the API endpoints.
	* The product data model is inside `/data_models/`.
	* The controller for accessing the database is inside `/data_access/`.
* Frontend
	* Source code for the frontend app is inside `react-frontend/src/`.
	* `/src/index.js` is the entrypoint.
	* `/src/App.js` wraps the app in a template element containing the router that renders the rest of the app.
	* The are 3 routes (pages): Products, AddProduct, and Product. These are inside `/src/routes/`.
	* React components used by the routes are inside `/src/components/`.
	* `/src/store/` contains global state variables and their reducers.
	* `/src/utils/` contains various utility functions and objects used throughout the app.
