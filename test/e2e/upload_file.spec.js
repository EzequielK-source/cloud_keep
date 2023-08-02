const path = require('path');
const fs = require('fs/promises');
const request = require('supertest');
const cheerio = require('cheerio');
const app = require('../../src/app');
const file = require('../../src/models/file.schema');

describe('Upload file e2e test', () => {
  /**
   * Test end-to-end scenario for the "upload file" feature
   * Endpoint "/files/upload"
   * This test verifies the correct functionality of the
   * use case "upload file" following the next test cases:
   *  1. Should render upload_file template
   *  2. Valid POST request
   *    2.a should redirect to home template
   *    2.b should record file
   *    2.c should persist file in db
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
    afterEach(async () => {
      /**
       * Delete all files record from database
       */
      await file.deleteMany({});
    });
    const filePath = path.join(`${__dirname}/../assets`, 'archivo_prueba.txt');
    const expectedStoragedFile = path.join(`${__dirname}/../../storage_vault`, 'archivo_prueba.txt');
    it('Should redirect to home endpoint and status code 302', async () => {
      /**
       * Verify that after making the request the client
       * is redirected to the home route
       */
      const response = await request(app)
        .post(ENDPOINT)
        .attach('archives', filePath)
        .type('form');
      return expect(response.statusCode).toBe(302);
    });
    it('Should record the file archivo_prueba.txt in storage_vaul dir', async () => {
      /**
       * Verifies that after making the request to the endpoint
       * is recorded the file 'archivo_prueba.txt' in the storage_folder
       *
       * Scenario
       * 1. make the request
       * 2. the response statusCode should be 302
       * 3. Verifie if the file 'archivo_prueba.txt' can be accesed in the folder
       * storage_vault
       */

      const response = await request(app)
        .post(ENDPOINT)
        .attach('archives', filePath)
        .type('form');

      expect(response.statusCode).toBe(302);
      await fs.access(expectedStoragedFile);
    });
    it('Should persist the file in database', async () => {
      /**
       *  Verify that after making the request to the endpoint,
       * the file and the path where it is persisted in the database
       */
      const response = await request(app)
        .post(ENDPOINT)
        .attach('archives', filePath)
        .type('form');

      expect(response.statusCode).toBe(302);
      const archivos = await file.find();
      return expect(archivos.length).toBeGreaterThan(0);
    });
  });
});
