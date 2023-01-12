-- Create table categories
CREATE TABLE categories (
    id INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Create table products
CREATE TABLE products (
    id INT PRIMARY KEY,
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
    id INT PRIMARY KEY,
    customer_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price INT NOT NULL,
    total_price INT NOT NULL,
    status VARCHAR(255) NOT NULL,
    payment_method VARCHAR(255) NOT NULL,
    shipping_address TEXT
);

-- Create table customers
CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    address TEXT,
    phone VARCHAR(255),
    dob DATE NOT NULL DEFAULT '1970-01-01',
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Add foreign key to transactions.customer_id
ALTER TABLE transactions
ADD FOREIGN KEY (customer_id) REFERENCES customers(id);

-- Add foreign key to transactions.product_id
ALTER TABLE transactions
ADD FOREIGN KEY (product_id) REFERENCES products(id);