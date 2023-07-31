const request = require("supertest");
const app = require("../src/app");
describe("Upload file e2e test", () => {
  /**
   * Test end-to-end scenario for the "upload file" feature
   * Endpoint "/files/upload"
   * This test verifies the correct functionality of the
   * use case "upload file" following the next test cases:
   *  1. Should render upload_file template
   *  2. Valid POST request to the endpoint
   *    2.a should redirect to home template
   *    2.b should persist file record
   *
   * Tags {upload_file, e2e}
   */
  const ENDPOINT = "/files/upload";
  test("Should render upload_file template", async () => {
    /**
     * Verify if request the endpoint with GET method render
     * the template upload_file
     */
    const response = await request(app).get(ENDPOINT);

    expect(response.status).toBe(200);
  });
});
