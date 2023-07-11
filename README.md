### About the project

This is Kwan Lee's solution to the IS24 Full Stack Developer Technical Test. Thank you very much for considering my application for the position.


### Instructions for running on a local machine

1. Requirements:
  * Please make sure your machine is connected to the internet.
  * Please make sure that your machine has Docker Engine version `>=24.0.0` and Docker Compose version `>=2.7.0` installed.
  * Docker Engine (the Docker daemon) must be running.
2. Download my submission. It is a zip archive. Please extract it.
3. Open a terminal/PowerShell/cmd and navigate to the extracted folder (bc-public-service-technical-test)
4. From `bc-public-service-technical-test/`, run the following commands:
	* Builds the Python API Docker image using the Dockerfile in `./python-api`. Please wait unit the image is built.
		```sh
		docker build -t python-api python-api
		```
	* Builds the React frontent application using the Dockerfile in `./react-frontend`. Please wait unit the image is built.
		```sh
		docker build -t react-frontend react-frontend
		```
	* Runs the containers of the above images and also runs the required MariaDB container pulled from Docker Hub. Please wait until you see the message "Server is running on port 3000"
		```sh
		docker compose up
		```
	* The React frontend application can now be accessed by browsing to http://localhost:3000

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
	* MUI (Material UI) v5.13: User interface framework for styling React components
	* Formik v2.4: Library for working with forms in React
	* Yup v1.2: Library for validating form user inputs
	* Virtuoso v4.3: Library for creating React table components
	* Express v4.18: A Node.js server used to serve the bundled React app to the browser

### Additional notes
* The source code for the API component is inside the `api_source/` directory. This has already been transpiled for deployment. The transpiled code is inside `api_build/`. The API entrypoint is `index.js`.
* The API Swagger documentation is in `swagger.yaml`.
* The API provides endpoints that serve JSON data displayed by the front-end application and also serves the front-end application itself.
* The front-end application is a React microservice and can be hosted on a separate server if required.
* The source code for the front-end application is inside `react_frontend/src/`. It has already been built for deployment. The build files are inside `react_frontend/build/`.
* The API serves the front-end by serving the build files at the root `/` route.