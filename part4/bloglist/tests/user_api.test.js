const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

const bcrypt = require("bcrypt");
const User = require("../models/user");
const helper = require("./test_helper");

beforeEach(async () => {
  await User.deleteMany({});

  const passwordHash = await bcrypt.hash("sekret", 10);
  const user = new User({ username: "root", passwordHash });

  await user.save();
});

describe("invalid users are not created", () => {
  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "Artt2",
      name: "Arttu",
      password: "salasana",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test("creation fails with proper statuscode and message if username already taken", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "root",
      name: "Superuser",
      password: "salainen",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain("expected `username` to be unique");

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });
});

describe("invalid user creation", () => {
  test("fails with too short username and responds with 400", async () => {
    const newUser = {
      username: "ab",
      name: "name",
      password: "abcdef",
    };

    await api.post("/api/users").send(newUser).expect(400);
  });

  test("fails with too short password and responds with 400", async () => {
    const newUser = {
      username: "abcdef",
      name: "name",
      password: "ab",
    };

    await api.post("/api/users").send(newUser).expect(400);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
