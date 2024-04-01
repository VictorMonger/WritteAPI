const UsersModel = require ("../src/models/usersModel")

const validateModel = new UsersModel();

describe("Users Model", () => {
  describe("validate userNameExists", () => {
    test("should return false to a userName that not exists", () => {
      const nameToTest = "Color89";
      const nameToMatch = ""
    })
  })
})