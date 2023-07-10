# Built-in modules
import json

# External imports
import mysql.connector as database

# Internal imports
from .connection_params import get_connection_params
from data_models import ProductModel


# Queries the database and returns a list of all products
# The list contains product objects which are instances of the ProductModel
def get_products():
    try:
        # Connects to the database
        connection = database.connect(**get_connection_params())
        cursor = connection.cursor()
        # Executes a query to retrieve all products
        statement = """SELECT * FROM products ORDER BY pk DESC"""
        cursor.execute(statement)
        # cursor is a generator that returns each row of the database table as a tuple
        # Generates the tuples and maps them into a list of product objects
        products = []
        for row in cursor:
            product_data = {}
            for column_position, column_name in enumerate(ProductModel.properties):
                product_data[column_name] = row[column_position]
            products.append(ProductModel(product_data))

    # Passes errors to function caller. Has to be done to
    # gracefully disconnect from the database in the finally block.
    except Exception as e:
        raise type(e)(e.__str__())

    # The products were retrieved without error
    else:
        return products

    # Gracefully disconnects from the database
    # regardless of whether or not an error was raised.
    # Errors are ignored in case cursor/connection weren't defined
    finally:
        try:
            cursor.close()
        except Exception:
            pass
        try:
            connection.close()
        except Exception:
            pass


# Inserts a new product into the database and returns that product
def add_product(product_dict):
    try:
        # Validates user input by instantiating a product object
        product = ProductModel(product_dict)
        # Connects to the database
        connection = database.connect(**get_connection_params())
        cursor = connection.cursor()
        # Inserts product into database
        statement = """
            INSERT INTO products (id, name, description, colour, size)
            VALUES (%s, %s, %s, %s, %s)
        """
        parameters = (
            vars(product)["id"],
            vars(product)["name"],
            vars(product)["description"],
            vars(product)["colour"],
            vars(product)["size"],
        )
        cursor.execute(statement, parameters)
        # Places generated primary key into the product object
        product.set_pk(cursor.lastrowid)
    
    # Passes errors to function caller. Has to be done to
    # gracefully disconnect from the database in the finally block.
    except Exception as e:
        raise type(e)(e.__str__())

    # Insert operation executed without error
    else:
        connection.commit()
        return product

    # Gracefully disconnects from the database
    # regardless of whether or not an error was raised.
    # Errors are ignored in case cursor/connection weren't defined
    finally:
        try:
            cursor.close()
        except Exception:
            pass
        try:
            connection.close()
        except Exception:
            pass

# Queries the database and returns a single product identified by its Product ID
# The returned product is an object instance of the ProductModel
def get_product(id):
    try:
        # Connects to the database
        connection = database.connect(**get_connection_params())
        cursor = connection.cursor()
        # Executes a query to retrieve the product
        statement = """SELECT * FROM products WHERE id = %s"""
        parameters = (id,)
        cursor.execute(statement, parameters)
        # Instantiates a product object using the data retrieved by the cursor
        # Throws StopIternation error if no product is found with the Product ID
        product_data = {}
        row = next(cursor)
        for column_position, column_name in enumerate(ProductModel.properties):
            product_data[column_name] = row[column_position]
        product = ProductModel(product_data)

    # Passes errors to function caller. Has to be done to
    # gracefully disconnect from the database in the finally block.
    except Exception as e:
        raise type(e)(e.__str__())

    # The product was retrieved without error
    else:
        return product

    # Gracefully disconnects from the database
    # regardless of whether or not an error was raised.
    # Errors are ignored in case cursor/connection weren't defined
    finally:
        try:
            cursor.close()
        except Exception:
            pass
        try:
            connection.close()
        except Exception:
            pass

# Updates the fields of an existing product and
# returns an instance of the updated product
def update_product(product_json):
    try:
        # Validates user input by instantiating a product object
        product = ProductModel(product_json)
        # Connects to the database
        connection = database.connect(**get_connection_params())
        cursor = connection.cursor()
        # Replaces the fields of the product in the database
        # This statement identifies the product by its pk (primary key)
        statement = """
            REPLACE INTO products (pk, id, name, description, colour, size)
            VALUES (%s, %s, %s, %s, %s, %s)
        """
        parameters = (
            vars(product)["pk"],
            vars(product)["id"],
            vars(product)["name"],
            vars(product)["description"],
            vars(product)["colour"],
            vars(product)["size"],
        )
        cursor.execute(statement, parameters)

    # Passes errors to function caller. Has to be done to
    # gracefully disconnect from the database in the finally block.
    except Exception as e:
        raise type(e)(e.__str__())

    # Update operation executed without error
    else:
        connection.commit()
        return product
    
    # Gracefully disconnects from the database
    # regardless of whether or not an error was raised.
    # Errors are ignored in case cursor/connection weren't defined
    finally:
        try:
            cursor.close()
        except Exception:
            pass
        try:
            connection.close()
        except Exception:
            pass

# Deletes a product identified by its productID
# Has no return value. Throws error if unsuccessful
def delete_product(id):
    try:
        # Connects to the database
        connection = database.connect(**get_connection_params())
        cursor = connection.cursor()

        statement = """SELECT * FROM products WHERE id = %s"""
        parameters = (id,)
        cursor.execute(statement, parameters)
        next(cursor)

        # Deletes the product from the database
        statement = """DELETE FROM products WHERE id = %s"""
        parameters = (id,)
        cursor.execute(statement, parameters)

    # Passes errors to function caller. Has to be done to
    # gracefully disconnect from the database in the finally block.
    except Exception as e:
        raise type(e)(e.__str__())

    # Delete operation executed without error
    else:
        connection.commit()
        return

    # Gracefully disconnects from the database
    # regardless of whether or not an error was raised.
    # Errors are ignored in case cursor/connection weren't defined
    finally:
        try:
            cursor.close()
        except Exception:
            pass
        try:
            connection.close()
        except Exception:
            pass