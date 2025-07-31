import { faker } from "@faker-js/faker";
import { User } from "../entities/user.entity";
import { setSeederFactory } from "typeorm-extension";

export const userFactory = setSeederFactory(User, () => {
    const user = new User();

    user.firsname = faker.person.firstName();
    user.lastname = faker.person.lastName();
    user.email = faker.internet.email({
        firstName: user.firsname,
        lastName: user.lastname
    });
    user.createdAt = faker.date.past({ years: 1 });

    user.product = [];
    user.likedProduct = [] as any;

    return user;
});
