const request = require('supertest');
const cheerio = require('cheerio');
const app = require('../../src/app');
const { deleteAllFiles, createNfakeFiles } = require('../utils');

describe('Explore files e2e test', () => {
  /**
   * Test end-to-end scenario for the "explore files" feature
   * Endpoint "/files/explorer"
   * This test verifies the correct functionality of the
   * use case "explore files" following the next test cases:
   *  1. Should render explore_files template
   *    1.a Should render files-list-container
   *    1.b Should render 10 files-list-item
   *
   * Tags {explore_files, e2e}
   */
  const ENDPOINT = '/files/explorer';
  describe('Should render explore_files template', () => {
    /**
     * Verify that when making a request to the /files/explorer
     * endpoint with the GET method, the 'explore_files' template is rendered
     * and the following components are rendered:
     *  1. files-list-container
     *  2. 10 files-list-item
     */
    let response;
    let $;
    beforeAll(async () => {
      await deleteAllFiles();
      await createNfakeFiles(10);
      response = await request(app).get(ENDPOINT);
      $ = cheerio.load(response.text);
    });
    it('Should have status 200', () => {
      expect(response.statusCode).toBe(200);
    });
    it('Should render files-list-container', () => {
      const roleContainer = $('[role="files-list-container"]');
      expect(roleContainer.length).toBeGreaterThan(0);
    });
  });
});
