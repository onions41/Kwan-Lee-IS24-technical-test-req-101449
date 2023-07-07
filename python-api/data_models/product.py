import json


class Product:
    # The properties of the Product model
    properties = ("pk", "id", "name", "description", "colour", "size")

    def __init__(self, data):
        # Data validations
        # TODO: catch key errors in api

        # Product ID
        if not isinstance(data["id"], int) or data["id"] < 0:
            raise ValueError("The product ID must be a positive number.")

        # Product Name
        if (
            not isinstance(data["name"], str)
            or len(data["name"]) < 1
            or len(data["name"]) > 100
        ):
            raise ValueError("The product name must be between 1 and 100 characters.")

        # Product Descriptions
        if (
            not isinstance(data["description"], str)
            or len(data["description"]) < 1
            or len(data["description"]) > 10000
        ):
            raise ValueError(
                "The product description must be between 1 and 10,000 characters."
            )

        # Product Colour
        if (
            not isinstance(data["colour"], str)
            or len(data["colour"]) < 1
            or len(data["colour"]) > 100
        ):
            raise ValueError("The product colour must be between 1 and 100 characters.")

        # Product Size
        if not isinstance(data["size"], str) or data["size"].lower() not in [
            "small",
            "medium",
            "large",
        ]:
            raise ValueError(
                'The product size must be either "small", "medium", or "large"'
            )

        # Passed all validations

        self.pk = data["pk"] if "pk" in data else None
        self.id = data["id"]
        self.name = data["name"]
        self.description = data["description"]
        self.colour = data["colour"]
        self.size = data["size"]

    def set_pk(self, pk):
        self.pk = pk
