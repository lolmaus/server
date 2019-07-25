import Server from "../../lib/server";

describe("Unit | Server", function() {
  test("it can be instantiated", () => {
    let server = new Server();
    expect(server).toBeTruthy();
  });
});
