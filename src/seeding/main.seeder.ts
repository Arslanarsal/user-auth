// src/seeding/main.seeder.ts

import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { faker } from '@faker-js/faker';

import { User } from "../entities/user.entity";
import { Product } from "../entities/product.entity";
// Note: Assuming the class name is ProductFeature (PascalCase)
import { productFeature } from "../entities/productsfeature.entity";

export class MainSeeder implements Seeder {
  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
    const userRepo = dataSource.getRepository(User);
    const productRepo = dataSource.getRepository(Product);
    // FIXED a typo here. It now correctly gets the ProductFeature repository.
    const productFeatureRepo = dataSource.getRepository(productFeature);

    // 1. REMOVED the ProductType seeding section
    console.log("Starting seeder...");

    // 2. Seed 10 Users
    console.log("Seeding Users...");
    const userFactory = factoryManager.get(User);
    const users = await userFactory.saveMany(10);
    console.log(`-> ${users.length} Users seeded.`);

    // 3. Seed Products and Features
    console.log("Seeding Products and Features...");
    const productFactory = factoryManager.get(Product);
    const productFeatureFactory = factoryManager.get(productFeature);

    for (const user of users) {
      for (let i = 0; i < 5; i++) {
        const product = await productFactory.make();
        product.user = user;
        const savedProduct = await productRepo.save(product);

        const feature = await productFeatureFactory.make();
        feature.product = savedProduct;
        await productFeatureRepo.save(feature);
      }
    }
    console.log("-> Products and Features seeded.");


    // 4. Assign liked products to users
    console.log("Assigning liked products...");
    const allProducts = await productRepo.find();

    for (const user of users) {
      const likedSample = faker.helpers.arrayElements(allProducts, { min: 2, max: 4 });
      user.likedProduct = likedSample;
      await userRepo.save(user);
    }
    console.log("-> Liked products assigned.");
  }
}