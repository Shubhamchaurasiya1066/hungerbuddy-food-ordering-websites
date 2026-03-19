var express = require('express');
var router = express.Router();
var upload = require('./multer')
var pool = require('./pool');
const verifyToken = require('./authMiddleware');

/* GET users listing. */
router.post('/submit_category', upload.single('categoryicon'), function (req, res, next) {
    console.log(req.body);
    console.log(req.file);
    
    
    
    try {
        pool.query("insert into foodcategory(categoryname,categoryicon,createddate,createdtime,userid,branchid) values(?,?,?,?,?,?)", [req.body.categoryname,req.file.filename,req.body.createddate,req.body.createdtime,req.body.userid,req.body.branchid], function (error, result) {

            if (error) {
                 console.log(error);
                 


                res.status(500).json({ status: false, message: 'Database Error Pls contact Backend Team...' })
            }
           
            
            else {
                 console.log(result);
                res.status(200).json({ status: true, message: 'Category Submitted Successfully...' })
            }

        })
    }
    catch (e) {
        res.status(500).json({ status: false, message: 'Critical Server Error...' })

    }
});
router.post('/submit_branch', function (req, res) {

    try {
        pool.query('insert into branch(branchname, address, latlong, stateid, cityid, emailid, contactnumber, contactperson, createddate, createdtime, userid,password) values(?,?,?,?,?,?,?,?,?,?,?,?)', [req.body.branchname, req.body.address, req.body.latlong, req.body.stateid, req.body.cityid, req.body.emailid, req.body.contactnumber, req.body.contactperson, req.body.createddate, req.body.createdtime, req.body.userid,req.body.password], function (error, result) {


            if (error) {


                res.status(500).json({ status: false, message: 'Database Error Pls contact Backend Team...' })
            }
            else {
                res.status(200).json({ status: true, message: 'Category Submitted Successfully...' })

            }
        })
    }
    catch (e) {
        res.status(500).json({ status: false, message: 'Critical Server Error...' })

    }
})

router.get('/fetch_all_category',verifyToken, function (req, res) {
    try {
        pool.query('select * from foodcategory', function (error, result) {
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

router.get('/fetch_all_branch', function (req, res) {
    try {
        pool.query('select B.*,(select S.statename from states S where S.stateid=B.stateid) as statename,(select C.cityname from cities C where C.cityid=B.cityid) as cityname from branch B', function (error, result) {
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
router.post('/edit_category', function (req, res, next) {
    console.log(req.body);
    
    try {
        pool.query("update foodcategory set categoryname=?,createddate=?, createdtime=?, userid=? where categoryid=?", [req.body.categoryname, req.body.createddate, req.body.createdtime, req.body.userid, req.body.categoryid], function (error, result) {

            if (error) {



                res.status(500).json({ status: false, message: 'Database Error Pls contact Backend Team...' })
            }
            else {
                res.status(200).json({ status: true, message: 'Category Updated Successfully...' })
            }

        })
    }
    catch (e) {
        res.status(500).json({ status: false, message: 'Critical Server Error...' })

    }
});
router.post('/delete_category', function (req, res, next) {
    try {
        pool.query("delete from foodcategory where categoryid=?", [req.body.categoryid], function (error, result) {

            if (error) {



                res.status(500).json({ status: false, message: 'Database Error Pls contact Backend Team...' })
            }
            else {
                res.status(200).json({ status: true, message: 'Category Deleted Successfully...' })
            }

        })
    }
    catch (e) {
        res.status(500).json({ status: false, message: 'Critical Server Error...' })

    }
});
router.post('/edit_branch', function (req, res) {

    try {
        pool.query('update branch set branchname=?, address=?, latlong=?, stateid=?, cityid=?, emailid=?, contactnumber=?, contactperson=?, createddate=?, createdtime=?, userid=? where branchid=?', [req.body.branchname, req.body.address, req.body.latlong, req.body.stateid, req.body.cityid, req.body.emailid, req.body.contactnumber, req.body.contactperson, req.body.createddate, req.body.createdtime, req.body.userid,req.body.branchid], function (error, result) {


            if (error) {


                res.status(500).json({ status: false, message: 'Database Error Pls contact Backend Team...' })
            }
            else {
                res.status(200).json({ status: true, message: 'Category Updated Successfully...' })

            }
        })
    }
    catch (e) {
        res.status(500).json({ status: false, message: 'Critical Server Error...' })

    }
})

router.post('/delete_branch', function (req, res) {

    try {
        pool.query('delete from branch where branchid=?' ,[req.body.branchid], function (error, result) {


            if (error) {


                res.status(500).json({ status: false, message: 'Database Error Pls contact Backend Team...' })
            }
            else {
                res.status(200).json({ status: true, message: 'Category Updated Successfully...' })

            }
        })
    }
    catch (e) {
        res.status(500).json({ status: false, message: 'Critical Server Error...' })

    }
})

router.post('/edit_picture',upload.single('categoryicon'), function (req, res, next) {
    try {
        pool.query("update foodcategory set categoryicon=?,createddate=?, createdtime=?, userid=? where categoryid=?", [req.file.filename, req.body.createddate, req.body.createdtime, req.body.userid, req.body.categoryid], function (error, result) {

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
