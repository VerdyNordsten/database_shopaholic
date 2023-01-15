-- Create table categories
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);

-- Create table products
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price INT NOT NULL,
    category_id INT NOT NULL,
    image VARCHAR(255),
    quantity INT NOT NULL
);


-- Add foreign key to products.category_id
ALTER TABLE products
ADD FOREIGN KEY (category_id) REFERENCES categories(id);

-- Create table transactions
CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    customer_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price INT NOT NULL,
    total_price INT NOT NULL,
    status VARCHAR(255) NOT NULL,
    payment_method VARCHAR(255) NOT NULL,
    shipping_address TEXT
);

ALTER TABLE transactions ADD COLUMN create_at TIMESTAMP, ADD COLUMN update_at TIMESTAMP;

-- Create table customers
CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    address TEXT DEFAULT 'N/A',
    phone VARCHAR(255),
    dob DATE DEFAULT '1970-01-01'
);

-- Add foreign key to transactions.customer_id
ALTER TABLE transactions
ADD FOREIGN KEY (customer_id) REFERENCES customers(id);

-- Add foreign key to transactions.product_id
ALTER TABLE transactions
ADD FOREIGN KEY (product_id) REFERENCES products(id);