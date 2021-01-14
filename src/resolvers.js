const helloWorld = "Hello world !"

let users = [
  { id: 1, name: "Lorenzo", email: "lorenzo@gmail.com", age: 18 },
  { id: 2, name: "Magdeleine", email: "magdeleine@gmail.com", age: 18 }
]

const resolvers = {
  Query: {
    hello: () => helloWorld,
    users: () => users,
    user: (parent, { id, name }) => users.find(user => user.id == id
      && (name ? user.name == name : true))
  },
  Mutation: {
    createUser: (parent, { id, name, email, age }) => {
      const existingUser = users.find(user => user.id == id);
      if (!existingUser) {
        const createdUser = { id, name, email, age };
        users.push(createdUser);
        return createdUser;
      } else {
        throw new Error('User already exist');
      }
    },
    deleteUser: (parent, { id }) => {
      const index = users.findIndex(user => user.id == id);
      if (index != -1) {
        users = users.splice(index, 1);
        return true;
      } else {
        return false;
      }
    }
  }
}

export default resolvers