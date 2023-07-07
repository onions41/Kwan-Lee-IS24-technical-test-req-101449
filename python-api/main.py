# Built-in modules
import os

# Internal modules
# from data_models import Product
import data_access

# External modules
from flask import Flask, jsonify, make_response, request

app = Flask(__name__)


# Get all products
@app.route("/products", methods=["GET"])
def get_products():
    products = data_access.get_products()

    # Serializes products, which is a list of Product instances, into a JSON string
    products_json = jsonify(list(map(lambda product: product.__dict__, products)))

    response = make_response(products_json, 200)

    # Set the content type header
    response.headers["Content-Type"] = "application/json"

    # Return JSON response
    return response


# Add a product
@app.route("/products", methods=["POST"])
def add_product():
    added_product = data_access.add_product(request.get_json())
    added_product_json = jsonify(added_product.__dict__)

    response = make_response(added_product_json, 200)
    response.headers["Content-Type"] = "application/json"

    return response


# Update a product
@app.route("/products/<id>", methods=["PUT"])
def add_product():
    update_product = data_access.update_product(request.get_json())
    updated_product_json = jsonify(updated_product.__dict__)

    response = make_response(updated_product_json, 200)
    response.headers["Content-Type"] = "application/json"

    return response


# Get a product
@app.route("/products/<id>", methods=["GET"])
def get_product(id):
    product = data_access.get_product(id)
    product_json = jsonify(product.__dict__)

    response = make_response(product_json, 200)
    response.headers["Content-Type"] = "application/json"

    return response


# Delete a product
@app.route("/products/<id>", methods=["DELETE"])
def delete_product(id):
    data_access.delete_product(id)

    response = make_response("deleted", 200)
    # Set the content type header
    response.headers["Content-Type"] = "text/plain"

    return response


if __name__ == "__main__":
    app.run(debug=True)


# *****Scratch*****

# app = Flask(__name__)


# @app.route("/")
# def hello_world():
#     return "<p>Hello, World!</p>"


# db.create_all()
# app.run(debug=True)

#     from flask import Flask, jsonify, request
# from flask_sqlalchemy import SQLAlchemy
# from flask_marshmallow import Marshmallow

# # Initialize Flask app
# app = Flask(__name__)
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///products.db'
# db = SQLAlchemy(app)
# ma = Marshmallow(app)

# # Product model
# class Product(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(100), nullable=False)
#     price = db.Column(db.Float, nullable=False)

#     def __init__(self, name, price):
#         self.name = name
#         self.price = price

# # Product schema for serialization
# class ProductSchema(ma.Schema):
#     class Meta:
#         fields = ('id', 'name', 'price')

# product_schema = ProductSchema()
# products_schema = ProductSchema(many=True)

# # Create a product
# @app.route('/products', methods=['POST'])
# def create_product():
#     name = request.json['name']
#     price = request.json['price']
#     new_product = Product(name, price)
#     db.session.add(new_product)
#     db.session.commit()
#     return product_schema.jsonify(new_product)

# # Get all products
# @app.route('/products', methods=['GET'])
# def get_products():
#     all_products = Product.query.all()
#     result = products_schema.dump(all_products)
#     return jsonify(result)

# # Get a single product by ID
# @app.route('/products/<int:product_id>', methods=['GET'])
# def get_product(product_id):
#     product = Product.query.get(product_id)
#     return product_schema.jsonify(product)

# # Update a product
# @app.route('/products/<int:product_id>', methods=['PUT'])
# def update_product(product_id):
#     product = Product.query.get(product_id)
#     product.name = request.json['name']
#     product.price = request.json['price']
#     db.session.commit()
#     return product_schema.jsonify(product)

# # Delete a product
# @app.route('/products/<int:product_id>', methods=['DELETE'])
# def delete_product(product_id):
#     product = Product.query.get(product_id)
#     db.session.delete(product)
#     db.session.commit()
#     return product_schema.jsonify(product)
