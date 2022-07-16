const request = require("supertest");
const app = require("../backend/app");
const User = require("../backend/models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const hashPassword = async function (password) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  name: "John Doe",
  email: "john.doe@gmail.com",
  password: "123456",
  tokens: [
    {
      token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET),
    },
  ],
};

beforeEach(async () => {
  await User.deleteMany();
  await new User(userOne).save();
});

test("Should signup a new user", async () => {
  const response = await request(app)
    .post("/api/users")
    .send({
      name: "John",
      email: "john@example.com",
      password: "123456",
    })
    .expect(201);
  const user = await User.findById(response.body._id);
  expect(user).not.toBeNull();
  expect(response.body).toMatchObject({
    name: "John",
    email: "john@example.com",
  });
  expect(user.password).not.toBe("123456");
});

test("Should login an existing user", async () => {
  const response = await request(app)
    .post("/api/users/login")
    .send({
      email: userOne.email,
      password: hashPassword(userOne.password),
    })
    .expect(200);
  console.log(response.body);
  const user = await User.findById(userOneId);
  expect(user).not.toBeNull();
  console.log(user);
  //expect(response.body.token).toBe(user.tokens[1].token);
});

test("should not login a user with invalid password", async () => {
  await request(app)
    .post("/api/users/login")
    .send({
      email: userOne.email,
      password: "1234567",
    })
    .expect(400);
});

test("Should get user profile", async () => {
  await request(app)
    .get("/api/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test("Should not get user profile for unauthenticated users", async () => {
  await request(app).get("/api/users/me").send().expect(401);
});
