const request = require("supertest");
const app = require("../backend/app");

test("should signup a new user", async () => {
  await request(app)
    .post("/api/users")
    .send({
      name: "John",
      email: "john@example.com",
      password: "123456",
    })
    .expect(201);
});
