// src/seeding/seed.ts

import { DataSource, DataSourceOptions } from "typeorm";
import { runSeeders, SeederOptions } from "typeorm-extension";

// Your DB config
import dbConfig from "../config/db.config";

// Factories
import { userFactory } from "./user.factory";
import { productFactory } from "./productFactory";
import { productFeatureFactory } from "./productFeatureFactory";

// Seeder (Import the class, not an instance)
import { MainSeeder } from "./main.seeder";

// Import ALL entities your seeders will use
import { User } from '../entities/user.entity';
import { Product } from '../entities/product.entity';
// Note: Assuming the class name is ProductFeature (PascalCase)
import { productFeature } from '../entities/productsfeature.entity';

// Combine your DB config with seeder options
const options: DataSourceOptions & SeederOptions = {
  ...dbConfig(),

  // This array tells TypeORM which entities to load
  // REMOVED ProductType from this array
  entities: [User, Product, productFeature],

  factories: [userFactory, productFactory, productFeatureFactory],
  seeds: [MainSeeder], // Use the imported class name here
};

const dataSource = new DataSource(options);

dataSource.initialize()
  .then(async () => {
    console.log("🚀 Seeding has started...");
    await runSeeders(dataSource);
    console.log("✅ Seeding completed successfully.");
  })
  .catch((err) => {
    console.error("❌ Error during seeding:", err);
    process.exit(1);
  })
  .finally(async () => {
    if (dataSource.isInitialized) {
      await dataSource.destroy();
    }
  });