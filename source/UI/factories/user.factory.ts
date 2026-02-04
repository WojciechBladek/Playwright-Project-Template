import { RegisterUserModelUi } from '@_source/UI/models/user.model.js';
import { faker } from '@faker-js/faker/locale/en';

export function prepareRandomUserData(): RegisterUserModelUi {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  const registerUserData: RegisterUserModelUi = {
    userEmail: faker.internet.email({ provider: 'example.com' }),
    userName: faker.internet.username({
      firstName: firstName,
      lastName: lastName
    }),
    userPassword: faker.internet.password(),
    firstName: firstName,
    lastName: lastName,
    address: faker.location.street(),
    state: faker.location.state(),
    city: faker.location.city(),
    zipCode: faker.location.zipCode(),
    mobilePhone: faker.phone.number()
  };

  return registerUserData;
}
