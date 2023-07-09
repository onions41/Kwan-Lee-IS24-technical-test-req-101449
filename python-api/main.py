# External imports
from flask import Flask, jsonify, make_response, request
from flask_cors import CORS
from mysql.connector.errors import IntegrityError

# Internal imports
import data_access


# Flask is a Python library for building simple APIs
app = Flask(__name__)
# Enables cross-origin resource sharing so requests from the frontend are processed
# CORS should be configured more tightly before deploying on the web
CORS(app)


# Defining endpoints


# Get all products
@app.route("/products", methods=["GET"])
def get_products():
    try:
        # Retrieves a list of product objects
        products = data_access.get_products()
        # Serializes the list of products into a JSON string
        products_json = jsonify(list(map(lambda product: vars(product), products)))

    # Internal server error, responds with status code and error message
    except Exception as e:
        return make_response(f"{type(e)} {e.__str__()}", 500)

    # Products retrieved successfully, respond with results and code 200
    else:
        response = make_response(products_json, 200)
        response.headers["Content-Type"] = "application/json"
        return response


# Add a product
@app.route("/products", methods=["POST"])
def add_product():
    try:
        # Adds a product and returns the added product
        added_product = data_access.add_product(request.get_json())
        # Serializes the product into a JSON string
        added_product_json = jsonify(vars(added_product))

    # User error, missing fields
    except KeyError as e:
        return make_response("Input is missing fields", 422)
    # User error, incorrect data type
    except ValueError as e:
        return make_response("Incorrect data type in input", 422)
    # User error, product with same ID or name exists
    except IntegrityError as e:
        return make_response("Duplicate product ID or Name", 422)
    # Internal server error, responds with status code and error message
    except Exception as e:
        return make_response(f"{type(e)} {e.__str__()}", 500)

    # Products added successfully, respond with added product and code 200
    else:
        response = make_response(added_product_json, 200)
        response.headers["Content-Type"] = "application/json"
        return response


# Get a product
@app.route("/products/<id>", methods=["GET"])
def get_product(id):
    try:
        product = data_access.get_product(id)
        product_json = jsonify(vars(product))

    except StopIteration:
        return make_response("Could not a find product with that ID", 422)

    except Exception as e:
        return make_response(f"{type(e)} {e.__str__()}", 500)

    else:
        response = make_response(product_json, 200)
        response.headers["Content-Type"] = "application/json"
        return response


# Update a product
@app.route("/products/<id>", methods=["PUT"])
def update_product():  # No need to use ID in URL parameter. ID is in JSON body
    try:
        updated_product = data_access.update_product(request.get_json())
        updated_product_json = jsonify(vars(updated_product))

    # User error, missing fields
    except KeyError as e:
        return make_response("Input is missing fields", 422)
    # User error, incorrect data type
    except ValueError as e:
        return make_response("Incorrect data type in input", 422)
    except Exception as e:
        # Server error
        return make_response(f"{type(e)} {e.__str__()}", 500)

    else:
        response = make_response(updated_product_json, 200)
        response.headers["Content-Type"] = "application/json"
        return response


# Delete a product
@app.route("/products/<id>", methods=["DELETE"])
def delete_product(id):
    try:
        data_access.delete_product(id)

    except StopIteration:
        return make_response("Not product with the given ID exists", 422)
    except Exception as e:
        # Server error
        return make_response(f"{type(e)} {e.__str__()}", 500)

    else:
        return make_response(f"Product ID {id} was deleted", 200)


if __name__ == "__main__":
    # API is started this way only during development
    # Gunicorn is used instead for deployment in the Docker container
    app.run(debug=True)
