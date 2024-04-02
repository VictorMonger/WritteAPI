const UsersModel = require("../src/models/usersModel");

describe("Users Model", () => {
  describe("validate userNameExists", () => {
    test("should return true if userName already exists", async () => {
      const usersModel = new UsersModel();

      const existingUserName = "userExisting";

      usersModel.connection = jest.fn().mockReturnValue({
        select: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        first: jest.fn().mockResolvedValue({ userName: existingUserName }),
      });

      const userNameExists = await usersModel.userNameExists(existingUserName);

      expect(userNameExists).toBeTruthy();
      expect(userNameExists.userName).toBe(existingUserName)
    });
  });
});
