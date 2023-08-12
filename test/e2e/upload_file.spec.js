const path = require('path');
const fs = require('fs/promises');
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../src/app');
const file = require('../../src/modules/files/schema');
const { deleteAllFiles } = require('../utils');

describe('Upload file e2e test', () => {
  /**
   * Test end-to-end scenario for the "upload file" feature
   * Endpoint "/files/upload"
   * This test verifies the correct functionality of the
   * use case "upload file" following the next test cases:
   *  1. Valid POST request
   *    1.a should redirect to home template
   *    1.b should record file
   *    1.c should persist file in db
   *
   * Tags {upload_file, e2e}
   */
  const ENDPOINT = '/files/upload';
  describe('Valid POST request', () => {
    /**
     * Verify that when making the request to the endpoint
     * with the post method the record is created in the database
     * and it saves the file 'archivo_prueba.txt' in the folder
     */
    let response;
    const filePath = path.join(`${__dirname}/../assets`, 'archivo_prueba.txt');
    const filePath2 = path.join(`${__dirname}/../assets`, 'archivo_prueba2.txt');
    const expectedStoragedFile = path.join(`${__dirname}/../../storage_vault`, 'archivo_prueba.txt');
    beforeEach(async () => {
      await deleteAllFiles();
      response = await request(app)
        .post(ENDPOINT)
        .attach('archives', filePath)
        .attach('archives', filePath2)
        .type('form');
    });
    // eslint-disable-next-line arrow-body-style
    it('Should redirect to explorer page and have status code 302', () => {
      /**
       * Verify that after making the request the client
       * is redirected to the home route
       */
      expect(response.statusCode).toBe(302);
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
      expect(response.statusCode).toBe(302);
      await fs.access(expectedStoragedFile);
    });
    it('Should persist the file in database', async () => {
      /**
       *  Verify that after making the request to the endpoint,
       * the file and the path where it is persisted in the database
       */
      expect(response.statusCode).toBe(302);
      const archivos = await file.find({ absolutePath: expectedStoragedFile });
      return expect(archivos.length).toBe(1);
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
});
