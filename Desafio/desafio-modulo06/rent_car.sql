CREATE TABLE "customers" (
  "id" SERIAL PRIMARY KEY,
  "name" text NOT NULL,
  "age" integer NOT NULL,
  "cpf" integer NOT NULL,
  "phone" integer NOT NULL,
  "adress" text NOT NULL
);

CREATE TABLE "agencies" (
  "id" SERIAL PRIMARY KEY,
  "name" text,
  "type" text,
  "description" text,
  "created_at" timestamp DEFAULT 'now()'
);

CREATE TABLE "address" (
  "id" SERIAL PRIMARY KEY,
  "street" text NOT NULL,
  "number" integer,
  "district" text,
  "zipcode" integer NOT NULL,
  "city" text NOT NULL,
  "county" text NOT NULL
);

CREATE TABLE "cars" (
  "id" SERIAL PRIMARY KEY,
  "color" text,
  "license_plate" text,
  "airbag" integer DEFAULT 1,
  "model_id" integer
);

CREATE TABLE "models" (
  "id" SERIAL PRIMARY KEY,
  "brand" text,
  "model" text,
  "year" integer,
  "price" integer
);

CREATE TABLE "orders" (
  "id" SERIAL PRIMARY KEY,
  "agency_id" integer,
  "customers_id" integer,
  "date" timestamp DEFAULT 'now()',
  "price" integer
);

CREATE TABLE "payment" (
  "order_id" integer,
  "payment_type" text
);

CREATE TABLE "orders_item" (
  "id" SERIAL PRIMARY KEY,
  "car_id" integer,
  "order_id" integer
);

ALTER TABLE "agencies" ADD FOREIGN KEY ("id") REFERENCES "address" ("id");

ALTER TABLE "cars" ADD FOREIGN KEY ("model_id") REFERENCES "models" ("id");

ALTER TABLE "orders" ADD FOREIGN KEY ("customers_id") REFERENCES "customers" ("id");

ALTER TABLE "orders" ADD FOREIGN KEY ("agency_id") REFERENCES "agencies" ("id");

ALTER TABLE "orders_item" ADD FOREIGN KEY ("car_id") REFERENCES "cars" ("id");

ALTER TABLE "orders_item" ADD FOREIGN KEY ("order_id") REFERENCES "orders" ("id");

ALTER TABLE "orders" ADD FOREIGN KEY ("id") REFERENCES "payment" ("payment_type");
