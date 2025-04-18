-- Create Users table
CREATE TABLE "Users" (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  CHECK (email ~* '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$'),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Categories table
CREATE TABLE "Categories" (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Budgets table with user relationship
CREATE TABLE "Budgets" (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255),
  total_amount FLOAT NOT NULL,
  user_id UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT fk_user
    FOREIGN KEY (user_id) 
    REFERENCES "Users"(id)
    ON DELETE CASCADE
);

-- Create Transactions table with relationships
CREATE TABLE "Transactions" (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  amount FLOAT NOT NULL,
  description VARCHAR(255) NOT NULL,
  category_id UUID,
  budget_id UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT fk_category
    FOREIGN KEY (category_id)
    REFERENCES "Categories"(id)
    ON DELETE SET NULL,
  CONSTRAINT fk_budget
    FOREIGN KEY (budget_id)
    REFERENCES "Budgets"(id)
    ON DELETE CASCADE
);

-- Create indexes for better performance
CREATE INDEX idx_transactions_budget_id ON "Transactions"(budget_id);
CREATE INDEX idx_transactions_category_id ON "Transactions"(category_id);
CREATE INDEX idx_budgets_user_id ON "Budgets"(user_id);

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    