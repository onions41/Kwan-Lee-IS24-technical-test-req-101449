class ProductModel:
    # The properties of the Product model. This is a static attibute
    properties = ("pk", "id", "name", "description", "colour", "size")

    def __init__(self, data):
        # Data validations
        # TODO: catch key errors in api

        # Product ID
        try:
            dataIdInt = int(data["id"])
            if dataIdInt < 0:
                raise Exception
        except Exception:
            ValueError("The product ID must be a positive number.")

        # Product Name
        if (
            not isinstance(data["name"], str)
            or len(data["name"]) < 1
            or len(data["name"]) > 100
        ):
            raise ValueError("The product name must be between 1 and 100 characters.")

        # Product Descriptions
        # Is nullable. Must be string of length <= 10000 or null
        if data["description"] is not None and not (
            isinstance(data["description"], str) and len(data["description"]) <= 10000
        ):
            raise ValueError(
                "The product description cannot be longer than 10,000 characters."
            )

        # Product Colour
        # Is nullable. Must be string of length <= 100 or null
        if data["colour"] is not None and not (
            isinstance(data["colour"], str) and len(data["colour"]) <= 100
        ):
            raise ValueError("The product colour cannot be long than 100 characters.")

        # Product Size
        # Is nullable. Must be None, "", "small", "medium", or "large"
        if data["size"] is not None and not (
            isinstance(data["size"], str)
            and data["size"].lower()
            in [
                "",
                "small",
                "medium",
                "large",
            ]
        ):
            raise ValueError(
                'The product size must be either "small", "medium", or "large"'
            )

        # Passed all validations

        # TODO: Can get rid of these conditional operations by tacking them on the end of each if statements above
        self.pk = data["pk"] if "pk" in data else None
        self.id = data["id"]
        self.name = data["name"]
        self.description = None if data["description"] is None or len(data["description"]) == 0 else data["description"]
        self.colour = None if data["colour"] is None or len(data["colour"]) == 0 else data["colour"]
        self.size = None if data["size"] is None or len(data["size"]) == 0 else data["size"]

    def set_pk(self, pk):
        self.pk = pk
