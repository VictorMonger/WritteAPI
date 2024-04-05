const UsersModel = require("../../src/models/usersModel");
const connection = require("../../src/database/connection");

describe("Users Model", () => {
  describe("validate userNameExists", () => {
    test("should return true if userName already exists", async () => {
      const userNameToTest = "existing_User";

      const connectionMock = jest.spyOn(connection, "from");

      connectionMock.mockResolvedValueOnce([{ userName: userNameToTest }]);

      const usersModel = new UsersModel(connection);

      const userNameExists = await usersModel.userNameExists(userNameToTest);

      expect(userNameExists).toBeTruthy();

      connectionMock.mockRestore();
    });
  });
});