export class FinderUsersService {
  async execute() {
    return [
      {
        id: 1,
        name: "John Doe",
        email: "JohnDoe@gmail.com",
      },
      {
        id: 2,
        name: "Jane Doe",
        email: "JaneDoe@gmail.com",
      },
    ];
  }
}
