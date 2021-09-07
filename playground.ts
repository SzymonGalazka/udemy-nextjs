interface Person {
  name: string;
  age: number;
}

// type Person = {
//   name: string;
//   age: number;
// };

export const play = () => {
  console.log('Hello World');

  const name: string = 'Filip';
  const age: number = 30;

  const person: Person = {
    name: 'John',
    age: 34,
  };

  const logPersonInfo = (name: string, age: number) => {
    const info = `Name: ${name}, age: ${age}`;
    console.log(info);
    return info;
  };

  const logPersonInfo2 = (person: Person) => {
    const info = `Name: ${person.name}, age: ${person.age}`;
    console.error(info);
    return info;
  };

  logPersonInfo(name, age);
  logPersonInfo2(person);
};
