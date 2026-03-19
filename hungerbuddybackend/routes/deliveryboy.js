var express = require('express');
var router = express.Router();
var upload = require('./multer')
var pool = require('./pool');

router.post('/submit_deliveryboy', upload.single('picture'), function (req, res, next) {
    console.log(req.body);
    console.log(req.file);



    try {
        pool.query("insert into deliveryboy(branchid, deliveryname, dob, gender, emailid, mobileno, address, stateid, cityid, aadharno, status, vehicleno, picture, password, createddate, createdtime, userid) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
            [
                req.body.branchid,               
                req.body.deliveryname,
                req.body.dob,
                req.body.gender,
                req.body.emailid,
                req.body.mobileno,                
                req.body.address,
                req.body.stateid,
                req.body.cityid,
                req.body.aadharno,
                req.body.status,
                req.body.vehicleno,                
                req.file.filename,
                req.body.password,
                req.body.createddate,
                req.body.createdtime,
                req.body.userid
            ], function (error, result) {

                if (error) {
                    console.log(error);



                    res.status(500).json({ status: false, message: 'Database Error Pls contact Backend Team...' })
                }

                else {
                   
                    res.status(200).json({ status: true,message: 'Delivery Boy Record Submitted Successfully...' })
                }

            })
    }
    catch (e) {
        res.status(500).json({ status: false, message: 'Critical Server Error...' })

    }
});
router.get('/fetch_all_deliveryboy', function (req, res) {
    try {
        pool.query('select * from deliveryboy', function (error, result) {
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

router.post('/edit_delivery', function (req, res, next) {
    console.log(req.body);

    try {
        pool.query("update deliveryboy set branchid=?, deliveryname=?, dob=?, gender=?, emailid=?, mobileno=?, address=?, stateid=?, cityid=?, aadharno=?, status=?, vehicleno=?,createddate=?, createdtime=?, userid=? where delivery_id=?",
            [
                req.body.branchid,               
                req.body.deliveryname,
                req.body.dob,
                req.body.gender,
                req.body.emailid,
                req.body.mobileno,                
                req.body.address,
                req.body.stateid,
                req.body.cityid,
                req.body.aadharno,
                req.body.status,
                req.body.vehicleno,                
                req.body.createddate,
                req.body.createdtime,
                req.body.userid,
                req.body.delivery_id
            ], function (error, result) {

                if (error) {



                    res.status(500).json({ status: false, message: 'Database Error Pls contact Backend Team...' })
                }
                else {
                    res.status(200).json({ status: true, message: 'Delivery Record Updated Successfully...' })
                }

            })
    }
    catch (e) {
        res.status(500).json({ status: false, message: 'Critical Server Error...' })

    }
});
router.post('/delete_delivery', function (req, res, next) {
    try {
        pool.query("delete from deliveryboy where delivery_id=?", [req.body.delivery_id], function (error, result) {

            if (error) {



                res.status(500).json({ status: false, message: 'Database Error Pls contact Backend Team...' })
            }
            else {
                res.status(200).json({ status: true, message: 'Delivery Boy Record Deleted Successfully...' })
            }

        })
    }
    catch (e) {
        res.status(500).json({ status: false, message: 'Critical Server Error...' })

    }
});


router.post('/edit_deliveryboypicture', upload.single('picture'), function (req, res, next) {
    try {
        pool.query("update deliveryboy set picture=?,createddate=?,createdtime=?,userid=? where delivery_id=?",
            [
                req.file.filename,
                req.body.createddate,
                req.body.createdtime,
                req.body.userid,
                req.body.delivery_id
            ], function (error, result) {

                if (error) {



                    res.status(500).json({ status: false, message: 'Database Error Pls contact Backend Team...' })
                }
                else {
                    res.status(200).json({ status: true, message: 'Picture Updated Successfully...' })
                }

            })
    }
    catch (e) {
        res.status(500).json({ status: false, message: 'Critical Server Error...' })

    }
});

module.exports = router;
