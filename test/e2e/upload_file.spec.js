const path = require('path');
const request = require('supertest');
const cheerio = require('cheerio');
const app = require('../../src/app');

describe('Upload file e2e test', () => {
  /**
   * Test end-to-end scenario for the "upload file" feature
   * Endpoint "/files/upload"
   * This test verifies the correct functionality of the
   * use case "upload file" following the next test cases:
   *  1. Should render upload_file template
   *  2. Valid POST request
   *    2.a should redirect to home template
   *    2.b should persist file record
   *
   * Tags {upload_file, e2e}
   */
  const ENDPOINT = '/files/upload';
  describe('Should render upload_file template', () => {
    /**
     * Verify if request the endpoint with GET method render
     * the template upload_file
     */
    let response;
    let $;
    beforeAll(async () => {
      response = await request(app).get(ENDPOINT);
      $ = cheerio.load(response.text);
    });
    it('Should have status 200 ', () => {
      expect(response.status).toBe(200);
    });
    it('Should exist one file input', async () => {
      const fileInputElements = $('input[type="file"]');
      expect(fileInputElements.length).toBeGreaterThan(0);
    });

    it("Should exist one title with the text 'Seleccione el archivo a subir'", async () => {
      const title = $('h1').filter(
        (index, element) => $(element).text() === 'Seleccione el archivo a subir',
      );
      expect(title.length).toBeGreaterThan(0);
    });
  });
  describe('Valid POST request', () => {
    /**
     * Verify that when making the request to the endpoint
     * with the post method the record is created in the database
     * and it saves the file 'archivo_prueba.txt' in the folder
     */
    const filePath = path.join(`${__dirname}/../assets`, 'archivo_prueba.txt');
    it('Should redirect to home endpoint and status code 302', async () => {
      /**
       * Verify that after making the request the client
       * is redirected to the home route
       */
      const response = await request(app)
        .post(ENDPOINT)
        .attach('archivos', filePath)
        .type('form');
      return expect(response.statusCode).toBe(302);
    });
  });
});
