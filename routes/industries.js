const express = require("express");
const router = express.Router();
const db = require('../db')
const slugify = require('slugify')
const { ExpressError } = require('../expressError')


router.get('/', async (req,res,next) => {
    try {
	const results  = await db.query(`select industries.description, companies.name from industries left join comp_industry on industries.id=comp_industry.industry_id left join companies on comp_industry.comp_code=companies.code`);

	
	console.log(results.rows)
	return res.json({industries: results.rows})
    } catch (err) {
	return next(err);
    }
})

router.get('/:id', async (req,res,next) => {
    try {

	const {id} = req.params;
	const results  = await db.query(`SELECT * FROM industries where id=$1`, [id]);

	if(results.rows.length === 0) {
	    throw new ExpressError(`Can't find company with code of ${code}`,404)
	}
	return res.send({industry: results.rows[0]})

    } catch (err) {
	return next(err);
    }
})

router.post('/', async (req,res,next) => {
    try {
	const {comp_code, industry_id} = req.body;
	const results  = await db.query('INSERT INTO comp_industry (comp_code, industry_id) VALUES ($1, $2) RETURNING comp_code, industry_id', [comp_code, industry_id]); 
	return res.status(201).json({company: results.rows[0]})
    } catch (err) {
	return next(err);
    }
})


module.exports = router;
