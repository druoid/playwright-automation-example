import { faker } from "@faker-js/faker";

const gender: "male" | "female" = "female";

export const generateUser = () => ({
  name: faker.person.firstName(gender),
  lastName: faker.person.lastName(gender),
  email: faker.internet.email(),
  password: faker.internet.password(),
  dateofBirth: { day: 1, month: 1, year: "2000" },
  address: faker.location.streetAddress(),
  company: faker.company.name(),
  state: faker.location.state(),
  city: faker.location.city(),
  zipcode: faker.location.zipCode(),
  mobile: faker.phone.number(),
  cardnumber: faker.finance.creditCardNumber(),
  cardexpirymonth: "12",
  cardexpiryyear: "2030",
  cardcvv: faker.finance.creditCardCVV(),
});

export const user = generateUser();
