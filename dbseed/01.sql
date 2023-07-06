--These SQL statements are executed when the MariaDB Docker container is started for the first time
--They are executed on the default database, bc_store, which is specified in docker-compose.yml (MARIADB_DATABASE: bc_store)

--Creates the products table
CREATE TABLE products (
  pk INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  id VARCHAR(50) NOT NULL UNIQUE,
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  colour VARCHAR(100),
  size ENUM('small', 'medium', 'large')
);

--Inserts seed data into the products table
INSERT INTO products (id, name, description, colour, size) VALUES
  ('RBS1000PM', 'Robot Malibu Stacy', 'The Malibu Stacy T-1000 fashion robot doll. Comes with hat and laser vision.', 'pink', 'medium'),
  ('GRF2000BL', 'Gordon Ramsay Action Figure', 'Hyper realistic action figure that speaks with the real voice of the master chef.', 'blue', 'large'),
  ('SPX3000BM', 'Smartphone X', 'Advanced smartphone with cutting-edge features.', 'black', 'medium'),
  ('VIW4000SS', 'Vintage Watch', 'Elegant watch with a classic design.', 'silver', 'small'),
  ('WLP5000WM', 'Wireless Headphones', 'High-quality wireless headphones with noise-cancellation.', 'white', 'medium'),
  ('LTP6000GL', 'Laptop Pro', 'Powerful laptop for professional use.', 'gray', 'large'),
  ('SNF0700BL', 'Sneakers Flex', 'Comfortable sneakers for active lifestyles.', 'blue', 'large'),
  ('CMD0800RM', 'Coffee Maker Deluxe', 'State-of-the-art coffee maker for the perfect brew.', 'red', 'medium'),
  ('DHB0620BS', 'Designer Handbag', 'Luxurious handbag made with premium leather.', 'brown', 'small'),
  ('VRH0910BK', 'Virtual Reality Headset', 'Immersive virtual reality experience with stunning visuals.', 'black', 'medium'),
  ('DCM0730SV', 'Digital Camera', 'High-resolution camera for capturing memorable moments.', 'silver', 'medium'),
  ('GMC0820BK', 'Gaming Console', 'Next-generation gaming console with powerful performance.', 'black', 'large'),
  ('PBS0840RD', 'Portable Bluetooth Speaker', 'Compact speaker with rich audio quality.', 'red', 'small'),
  ('FTK0970PR', 'Fitness Tracker', 'Smart wearable device to track your fitness goals.', 'purple', 'small'),
  ('LTH0710BK', 'Leather Jacket', 'Stylish leather jacket for a fashionable look.', 'black', 'large'),
  ('TVS0830SV', 'Smart TV', 'Ultra HD smart TV with built-in streaming services.', 'silver', 'large'),
  ('SWT0930GR', 'Sports Watch', 'Durable watch designed for outdoor activities.', 'green', 'medium'),
  ('WEB0900WT', 'Wireless Earbuds', 'True wireless earbuds for on-the-go music.', 'white', 'small'),
  ('DCP0860BK', 'Desktop Computer', 'High-performance desktop computer for demanding tasks.', 'black', 'large'),
  ('BPB0940GY', 'Travel Backpack', 'Spacious backpack with multiple compartments for travel.', 'gray', 'large');