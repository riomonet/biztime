const express = require("express");
const router = express.Router();
const db = require('../db')
const { ExpressError } = require('../expressError')


router.get('/', async (req,res,next) => {
    try {
	const results  = await db.query(`select * from companies`);
	return res.json({companies: results.rows})
    } catch (err) {
	return next(err);
    }
})

router.get('/:code', async (req,res,next) => {
    try {
	const {code} = req.params;
	const results  = await db.query(`SELECT * FROM companies join invoices on companies.code=invoices.comp_code where code=$1`, [code]);
	if(results.rows.length === 0) {
	    throw new ExpressError(`Can't find company with code of ${code}`,404)
	}
	return res.send({company: results.rows})
    } catch (err) {
	return next(err);
    }
})

router.post('/', async (req,res,next) => {
    try {
	const {code, name, description} = req.body;
	const results  = await db.query('INSERT INTO companies (code,name, description) VALUES ($1, $2, $3) RETURNING code, name, description', [code, name , description]); 
	return res.status(201).json({company: results.rows[0]})
    } catch (err) {
	return next(err);
    }
})

router.put('/:code', async (req,res,next) => {
    try {
	const {name, description} = req.body;
	const {code} = req.params;
	const results  = await db.query('UPDATE companies SET name=$1, description=$2 WHERE code=$3 RETURNING *', [name, description, code])
	if(results.rows.length === 0) {
	    throw new ExpressError(`Can't update company with code of ${code}`,404)
	}
	return res.status(200).json({company: results.rows[0]})
    }
	catch (err) {
	return next(err);
    }
})

router.delete('/:code', async (req,res,next) => {
    try {
	const {code} = req.params;
	const check = await db.query('SELECT * FROM companies WHERE code =$1', [code])
	if(check.rows.length === 0) {
	    throw new ExpressError(`Can't update company with code of ${code}`,404)
	}
	const results  = await db.query('DELETE from companies WHERE code=$1', [code])
	return res.send({status: "DELETED"})
    } catch (err) {
	return next(err);
    }
})

module.exports = router;
