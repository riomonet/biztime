// process.env.NODE_ENV = 'test';
// const request = require('supertest')
// const app = require('../app')
// const db = require('../db')

// let testInvoice;

beforeEach( async () => {
    // const cmp = await db.query(`INSERT INTO companies (code, name, description) VALUES ('m59', 'boatyardt59','a really cool marina') RETURNING code, name, description `)
    // const result = await db.query(`INSERT INTO invoices (comp_code, amt) VALUES ('m59','5320') RETURNING *`)
    // testInvoice = result.rows[0];
})


afterAll( async () => {
    await db.end()
})
 

