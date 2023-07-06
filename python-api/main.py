# Built-in modules
import os

# Internal modules

# External modules
from dotenv import load_dotenv
import mysql.connector as database

# from flask import Flask


def main():
    if load_dotenv(".env.development"):
        connection = database.connect(
            user=os.getenv("DB_USER"),
            password=os.getenv("DB_PASSWORD"),
            host=os.getenv("DB_HOST"),
            port=os.getenv("DB_PORT"),
            database=os.getenv("DATABASE_NAME"),
        )

    cursor = connection.cursor()

    query = """SELECT * FROM products"""

    cursor.execute(query)

    for row in cursor:
        print(row)


if __name__ == "__main__":
    main()


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
