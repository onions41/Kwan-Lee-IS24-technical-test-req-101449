# Entrypoint for the API

# External imports
from flask import Flask, jsonify, make_response, request
from flask_cors import CORS
from mysql.connector.errors import IntegrityError

# Internal imports
import data_access


# Flask is a Python library for building APIs
app = Flask(__name__)
# Enables cross-origin resource sharing so requests from the frontend are not blocked
# If needed, this can be configured more specifically to accept requests from only certain hosts
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

    # Internal server error, responds with error message
    except Exception as e:
        return make_response(f"{type(e)} {e.__str__()}", 500)

    # Products retrieved successfully, responds with data
    else:
        response = make_response(products_json, 200)
        response.headers["Content-Type"] = "application/json"
        return response


# Add a product
@app.route("/products", methods=["POST"])
def add_product():
    try:
        # Adds a product and returns the added product data
        added_product = data_access.add_product(request.get_json())
        # Serializes the product data into a JSON string
        added_product_json = jsonify(vars(added_product))

    # User error, missing fields
    except KeyError as e:
        return make_response("Input is missing fields", 422)
    # User error, incorrect data type
    except ValueError as e:
        # Errors are chained from the product model
        return make_response(e.__str__(), 422)
    # User error, product with same ID or Name exists
    except IntegrityError as e:
        return make_response("That Product ID or Product Name is already taken", 422)
    # Internal server error
    except Exception as e:
        return make_response(f"{type(e)} {e.__str__()}", 500)

    # Product added successfully, responds with added product data
    else:
        response = make_response(added_product_json, 200)
        response.headers["Content-Type"] = "application/json"
        return response


# Get a product
@app.route("/products/<id>", methods=["GET"])
def get_product(id):
    try:
        # Retrieves a product by its Product ID
        product = data_access.get_product(id)
        # Serializes the product into a JSON string
        product_json = jsonify(vars(product))

    # User error, no product with that Product ID
    except StopIteration:
        return make_response("There is no product with that Product ID", 422)
    # Internal server error
    except Exception as e:
        return make_response(f"{type(e)} {e.__str__()}", 500)

    # Product found, responds with product data
    else:
        response = make_response(product_json, 200)
        response.headers["Content-Type"] = "application/json"
        return response


# Update a product
@app.route("/products/<id>", methods=["PATCH"])
# Parameter is not used, but must be declared anyway for Flask
def update_product(id):
    try:
        # Updates a product and returns the updated product data
        updated_product = data_access.update_product(request.get_json())
        # Serializes the product data into a JSON string
        updated_product_json = jsonify(vars(updated_product))

    # User error, missing fields
    except KeyError as e:
        return make_response("Input is missing fields", 422)
    # User error, incorrect data type
    except ValueError as e:
        # Errors are chained from the product model
        return make_response(e.__str__(), 422)
    # User error, product with same ID or Name exists
    except IntegrityError as e:
        return make_response("That Product ID or Product Name is already taken", 422)
    # Internal server error
    except Exception as e:
        return make_response(f"{type(e)} {e.__str__()}", 500)

    # Product updated successfully, responds with updated product data
    else:
        response = make_response(updated_product_json, 200)
        response.headers["Content-Type"] = "application/json"
        return response


# Delete a product
@app.route("/products/<id>", methods=["DELETE"])
def delete_product(id):
    try:
        # Deletes a product identified by its Product ID
        data_access.delete_product(id)

    # User error, no product with given Product ID exists
    except StopIteration:
        return make_response("No product with the given Product ID exists", 422)
    # Internal server error
    except Exception as e:
        return make_response(f"{type(e)} {e.__str__()}", 500)

    # Product deleted successfully
    else:
        return make_response(f"Product ID {id} was deleted", 200)


if __name__ == "__main__":
    # python main.py is only run during development
    # Gunicorn server is used to launch the API in Docker container
    app.run(port=8000, debug=True)
