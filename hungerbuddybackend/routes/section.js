var express = require('express');
var router = express.Router();
var upload = require('./multer')
var pool = require('./pool');

router.post('/submit_section', function (req, res) {
    try {

        pool.query('insert into section(branchid, batchid, sectionname,createddate,createdtime,userid) values(?,?,?,?,?,?)',
            [
                req.body.branchid,
                req.body.batchid,
                req.body.sectionname,
                req.body.createddate,
                req.body.createdtime,
                req.body.userid
            ], function (error, result) {
                if (error) {

                    res.status(500).json({ status: false, message: 'Database Error Pls contact Backend Team...' })
                }

                else {

                    res.status(200).json({ status: true, message: 'Section Submitted Successfully...' })
                }

            })
    }
    catch (e) {

        res.status(500).json({ status: false, message: 'Critical Server Error...' })
    }
})

router.get('/fetch_all_section', function (req, res) {
    try {

        pool.query('select S.*,(select B.branchname from branch B where B.branchid=S.branchid) as branchname,(select B.batchname from batch B where B.batchid=S.batchid) as batchname from section S', function (error, result) {
            if (error) {

                res.status(500).json({ status: false, message: 'Database Error Pls contact Backend Team...' })
            }
            else {

                res.status(200).json({ data: result, status: true, message: 'Success...' })
            }
        })

    }
    catch (e) {

        res.status(500).json({ status: false, message: 'Critical Server Error...' })
    }
})
router.post('/edit_section', function (req, res) {
    try {

        pool.query('update section set branchid=?,batchid=?,sectionname=?,createddate=?,createdtime=?,userid=? where sectionid=?',
            [
                req.body.branchid,
                req.body.batchid,
                req.body.sectionname,
                req.body.createddate,
                req.body.createdtime,
                req.body.userid,
                req.body.sectionid
                
            ], function (error, result) {
                if (error) {

                    res.status(500).json({ status: false, message: 'Database Error Pls contact Backend Team...' })
                }


                else {

                    res.status(200).json({ status: true, message: 'Section Edited Successfully...' })
                }

            })

    }
    catch (e) {

        res.status(500).json({ status: false, message: 'Critical Server Error...' })
    }
})
router.post('/delete_section', function (req, res) {
    try {

        pool.query('delete from section where sectionid=?', [
            req.body.sectionid
        ], function (error, result) {
            if (error) {

                res.status(500).json({ status: false, message: 'Database Error Pls contact Backend Team...' })
            }


            else {

                res.status(200).json({ status: true, message: 'Section Deleted Successfully...' })
            }
        })

    }
    catch (e) {

        res.status(500).json({ status: false, message: 'Critical Server Error...' })
    }
})

module.exports = router