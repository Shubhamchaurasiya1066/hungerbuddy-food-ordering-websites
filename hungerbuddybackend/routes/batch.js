var express = require('express');
var router = express.Router();
var upload = require('./multer')
var pool = require('./pool');
const { route } = require('./fooditem');


router.post('/submit_batch', function (req, res) {
    try {

        pool.query('insert into batch(branchid, batchname, session,createddate,createdtime,userid) values(?,?,?,?,?,?)',
            [
                req.body.branchid,
                req.body.batchname,
                req.body.session,
                req.body.createddate,
                req.body.createdtime,
                req.body.userid
            ], function (error, result) {
                if (error) {
                    console.log(error);



                    res.status(500).json({ status: false, message: 'Database Error Pls contact Backend Team...' })
                }


                else {
                    console.log(result);
                    res.status(200).json({ status: true, message: 'Batch Submitted Successfully...' })
                }

            })
    }
    catch (e) {

        res.status(500).json({ status: false, message: 'Critical Server Error...' })
    }
})

router.get('/fetch_all_batch', function (req, res) {
    try {

        pool.query('select B.*,(select BR.branchname from branch BR where BR.branchid=B.branchid) as branchname from batch B', function (error, result) {
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
router.post('/edit_batch', function (req, res) {
    try {

        pool.query('update batch set branchid=?,batchname=?,session=?,createddate=?,createdtime=?,userid=? where batchid=?',
            [
                req.body.branchid,
                req.body.batchname,
                req.body.session,
                req.body.createddate,
                req.body.createdtime,
                req.body.userid,
                req.body.batchid
            ], function (error, result) {
                if (error) {
                    console.log(error);



                    res.status(500).json({ status: false, message: 'Database Error Pls contact Backend Team...' })
                }


                else {
                    console.log(result);
                    res.status(200).json({ status: true, message: 'Batch Edited Successfully...' })
                }

            })

    }
    catch (e) {

        res.status(500).json({ status: false, message: 'Critical Server Error...' })
    }
})
router.post('/delete_batch', function (req, res) {
    try {

        pool.query('delete from batch where batchid=?', [
            req.body.batchid
        ], function (error, result) {
            if (error) {
                console.log(error);



                res.status(500).json({ status: false, message: 'Database Error Pls contact Backend Team...' })
            }


            else {
                console.log(result);
                res.status(200).json({ status: true, message: 'Batch Deleted Successfully...' })
            }
        })

    }
    catch (e) {

        res.status(500).json({ status: false, message: 'Critical Server Error...' })
    }
})

module.exports = router