import { faker } from "@faker-js/faker";
import { productFeature } from "../entities/productsfeature.entity";
import { setSeederFactory } from "typeorm-extension";

export const productFeatureFactory = setSeederFactory(productFeature, () => {
  const feature = new productFeature();

  feature.bedroom = faker.number.int({ min: 1, max: 5 });
  feature.washroom = faker.number.int({ min: 1, max: 4 });
  feature.parkingSpots = faker.number.int({ min: 0, max: 3 });
  feature.hasBalcony = faker.datatype.boolean();
  feature.haSwimmingPool = faker.datatype.boolean();

  // Relation to product will be assigned later during seeding
  feature.product = null as any;

  return feature;
});
