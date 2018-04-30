/* eslint-disable no-console */
if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = 'test';
}
require('dotenv').config({ path: `./.${process.env.NODE_ENV}.env` });

const { expect } = require('chai');
const request = require('supertest');
const server = require('../app');

console.log(process.env.NODE_ENV);

describe('API', () => {
    describe('GET /', () => {
        it('responds with status code 200', () => {
            return request(server)
                .get('/')
                .then(res => {
                    expect(res.status).to.equal(200);
                })
                .catch(err => {
                    throw(err);
                })
        });
    });
});