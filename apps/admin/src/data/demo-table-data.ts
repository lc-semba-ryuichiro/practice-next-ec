import { faker } from "@faker-js/faker";

export interface Person {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  progress: number;
  status: "relationship" | "complicated" | "single";
  subRows: Array<Person> | undefined;
}

/**
 * Creates an array of sequential numbers from 0 to length-1.
 * @param length - The length of the array to create
 * @returns An array of sequential numbers
 */
const range = (length: number): Array<number> => {
  return Array.from({ length }, (_, index) => index);
};

/**
 * Creates a new Person object with fake data.
 * @param number_ - The ID number for the person
 * @returns A new Person object
 */
const newPerson = (number_: number): Person => {
  const statuses: Array<Person["status"]> = ["relationship", "complicated", "single"];
  const shuffled = faker.helpers.shuffle(statuses);
  const status = shuffled[0] ?? "single";
  return {
    id: number_,
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    age: faker.number.int(40),
    visits: faker.number.int(1000),
    progress: faker.number.int(100),
    status,
    subRows: undefined,
  };
};

/**
 * Generates hierarchical demo data for table testing.
 * @param lengths - Array of lengths for each depth level
 * @returns An array of Person objects with nested subRows
 */
export function makeData(...lengths: Array<number>): Array<Person> {
  const makeDataLevel = (depth = 0): Array<Person> => {
    // security/detect-object-injection: 誤検知
    // depth は関数内部で 0 から始まり、再帰で +1 されるのみ
    // lengths は rest parameter として渡される配列で、ユーザー入力は関係しない
    // eslint-disable-next-line security/detect-object-injection
    const length = lengths[depth] ?? 0;
    return range(length).map((index): Person => {
      const nextLength = lengths[depth + 1];
      return {
        ...newPerson(index),
        subRows: nextLength !== undefined && nextLength > 0 ? makeDataLevel(depth + 1) : undefined,
      };
    });
  };

  return makeDataLevel();
}
