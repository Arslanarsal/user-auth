import { faker } from "@faker-js/faker";
import { Product } from "../entities/product.entity";
import { setSeederFactory } from "typeorm-extension";

export const productFactory = setSeederFactory(Product, () => {
  const product = new Product();

  product.name = faker.commerce.productName();
  product.description = faker.commerce.productDescription();
  product.price = parseFloat(faker.commerce.price({ min: 10, max: 1000 }));

  // Relations will be set during seeding phase manually or via separate factories
  product.propertyFeature = null as any; // To be populated later
  product.user = null as any;            // Will be assigned a user manually
  product.likedBy = [] as any;           // Optional: assign users who liked the product later

  return product;
});
