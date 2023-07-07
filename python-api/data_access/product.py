# Built-in modules
import json

# External imports
import mysql.connector as database

# Internal imports
from .connection_params import get_connection_params
from data_models import Product


def get_products():
    # Establish connection to the database
    connection = database.connect(**get_connection_params())
    cursor = connection.cursor()

    query = """SELECT * FROM products"""
    cursor.execute(query)

    # "cursor" is a generator that returns table rows as tuples.
    # Maps returned rows into "products", a list of Product instances
    products = []
    for row in cursor:
        product_data = {}
        for column_position, column_name in enumerate(Product.properties):
            product_data[column_name] = row[column_position]
        products.append(Product(product_data))

    cursor.close()
    connection.close()
    # TODO: Logic for error handling

    return products


def add_product(product_json):
    # TODO: This will throw acceptions of json isn't in correct form
    product = Product(json.loads(product_json))

    connection = database.connect(**get_connection_params())
    cursor = connection.cursor()

    query = """
        INSERT INTO products (id, name, description, colour, size)
        VALUES (%s, %s, %s, %s, %s)
    """
    parameters = (
        product["id"],
        product["name"],
        product["description"],
        product["colour"],
        product["size"],
    )

    cursor.execute(query, parameters)

    product.set_pk(cursor.lastrowid)

    connection.commit()
    cursor.close()
    connection.close()

    return product


def get_product(id):
    # Establish connection to the database
    connection = database.connect(**get_connection_params())
    cursor = connection.cursor()

    query = """SELECT * FROM products WHERE id = %s"""
    parameters = (id,)
    cursor.execute(query, parameters)

    # "cursor" is a generator that returns table rows as tuples.
    # Only one row is returned because the table is filter by primary key.
    # Instantiates a Product using the returned row.
    product_data = {}
    row = next(cursor)
    for column_position, column_name in enumerate(Product.properties):
        product_data[column_name] = row[column_position]

    product = Product(product_data)

    cursor.close()
    connection.close()
    # TODO: Logic for error handling

    return product


def delete_product(id):
    # Establish connection to the database
    connection = database.connect(**get_connection_params())
    cursor = connection.cursor()

    query = """DELETE FROM products WHERE id = %s"""
    parameters = (id,)
    cursor.execute(query, parameters)

    # "cursor" is a generator that returns table rows as tuples.
    # Only one row is returned because the table is filter by primary key.
    # Instantiates a Product using the returned row.

    connection.commit()
    cursor.close()
    connection.close()
    # TODO: Logic for error handling

    return
