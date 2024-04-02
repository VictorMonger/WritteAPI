const UsersModel = require("../src/models/usersModel");
const connection = require("../src/database/connection");

describe("Users Model", () => {
  describe("validate userNameExists", () => {
    test("should return true if userName already exists", async () => {
      const usersModel = new UsersModel(connection);

      const userNameToTest = "userExisting";

      usersModel.connection = jest.fn().mockReturnValue({
        select: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        first: jest.fn().mockResolvedValue({ userName: userNameToTest }),
      });

      const userNameExists = await usersModel.userNameExists(userNameToTest);

      expect(userNameExists).toBeTruthy();
      expect(userNameExists.userName).toBe(userNameToTest)
    });
  });
});
