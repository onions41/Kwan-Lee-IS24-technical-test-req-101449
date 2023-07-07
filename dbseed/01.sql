--These SQL statements are executed when the MariaDB Docker container is started for the first time
--They are executed on the default database, bc_store, which is specified in docker-compose.yml (MARIADB_DATABASE: bc_store)

--Creates the products table
CREATE TABLE products (
  pk INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  id INT UNSIGNED NOT NULL UNIQUE,
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  colour VARCHAR(100),
  size ENUM('small', 'medium', 'large')
);

INSERT INTO products (id, name, description, colour, size) VALUES
  (111, 'Robot Malibu Stacy', 'The Malibu Stacy T-1000 fashion robot doll. Comes with hat and laser vision.', 'pink', 'medium'),
  (222, 'Gordon Ramsay Action Figure', 'Hyper realistic action figure that speaks with the real voice of the master chef.', 'blue', 'large'),
  (333, 'Smartphone X', 'Advanced smartphone with cutting-edge features.', 'black', 'medium'),
  (444, 'Vintage Watch', 'Elegant watch with a classic design.', 'silver', 'small'),
  (555, 'Wireless Headphones', 'High-quality wireless headphones with noise-cancellation.', 'white', 'medium'),
  (666, 'Laptop Pro', 'Powerful laptop for professional use.', 'gray', 'large'),
  (777, 'Sneakers Flex', 'Comfortable sneakers for active lifestyles.', 'blue', 'large'),
  (888, 'Coffee Maker Deluxe', 'State-of-the-art coffee maker for the perfect brew.', 'red', 'medium'),
  (999, 'Designer Handbag', 'Luxurious handbag made with premium leather.', 'brown', 'small'),
  (110, 'Virtual Reality Headset', 'Immersive virtual reality experience with stunning visuals.', 'black', 'medium'),
  (120, 'Digital Camera', 'High-resolution camera for capturing memorable moments.', 'silver', 'medium'),
  (130, 'Gaming Console', 'Next-generation gaming console with powerful performance.', 'black', 'large'),
  (140, 'Portable Bluetooth Speaker', 'Compact speaker with rich audio quality.', 'red', 'small'),
  (150, 'Fitness Tracker', 'Smart wearable device to track your fitness goals.', 'purple', 'small'),
  (160, 'Leather Jacket', 'Stylish leather jacket for a fashionable look.', 'black', 'large'),
  (170, 'Smart TV', 'Ultra HD smart TV with built-in streaming services.', 'silver', 'large'),
  (180, 'Sports Watch', 'Durable watch designed for outdoor activities.', 'green', 'medium'),
  (190, 'Wireless Earbuds', 'True wireless earbuds for on-the-go music.', 'white', 'small'),
  (200, 'Desktop Computer', 'High-performance desktop computer for demanding tasks.', 'black', 'large'),
  (300, 'Travel Backpack', 'Spacious backpack with multiple compartments for travel.', 'gray', 'large');