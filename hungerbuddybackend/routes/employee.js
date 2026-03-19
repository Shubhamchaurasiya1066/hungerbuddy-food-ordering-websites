var express = require('express');
var router = express.Router();
var upload = require('./multer')
var pool = require('./pool');

router.post('/submit_employee', upload.single('employee_picture'), function (req, res, next) {
    console.log(req.body);
    console.log(req.file);



    try {
        pool.query("insert into employees(branchid,employeename,dob,gender,emailid, mobileno,otherno,department,current_address, current_stateid, current_cityid, current_pincode, permanent_address, permanent_stateid, permanent_cityid, permanent_pincode, employee_picture,createddate,createdtime,userid) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
            [
                req.body.branchid,               
                req.body.employeename,
                req.body.dob,
                req.body.gender,
                req.body.emailid,
                req.body.mobileno,
                req.body.otherno,
                req.body.department,
                req.body.current_address,
                req.body.current_stateid,
                req.body.current_cityid,
                req.body.current_pincode,
                req.body.permanent_address,
                req.body.permanent_stateid,
                req.body.permanent_cityid,
                req.body.permanent_pincode,
                req.file.filename,
                req.body.createddate,
                req.body.createdtime,
                req.body.userid
            ], function (error, result) {

                if (error) {
                    console.log(error);



                    res.status(500).json({ status: false, message: 'Database Error Pls contact Backend Team...' })
                }

                else {
                   
                    res.status(200).json({ status: true,employeeid:result.insertId,message: 'Employee Record Submitted Successfully...' })
                }

            })
    }
    catch (e) {
        res.status(500).json({ status: false, message: 'Critical Server Error...' })

    }
});
router.get('/fetch_all_employee', function (req, res) {
    try {
        pool.query('select E.*,(select BR.branchname from branch BR where BR.branchid=E.branchid) as branchname,(select S.statename from states S where S.stateid=E.current_stateid) as currentstatename,(select C.cityname from cities C where C.cityid=E.current_cityid) as currentcityname,(select S.statename from states S where S.stateid=E.permanent_stateid) as permanentstatename,(select C.cityname from cities C where C.cityid=E.permanent_cityid) as permanentcityname from employees E', function (error, result) {
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

router.post('/edit_employee', function (req, res, next) {
    console.log(req.body);

    try {
        pool.query("update employees set branchid=?,employeename=?,dob=?,gender=?,emailid=?, mobileno=?, otherno=?,department=?,current_address=?, current_stateid=?, current_cityid=?, current_pincode=?, permanent_address=?, permanent_stateid=?, permanent_cityid=?, permanent_pincode=?,createddate=?,createdtime=?,userid=? where employeeid=?",
            [
                req.body.branchid,
                req.body.employeename,
                req.body.dob,
                req.body.gender,
                req.body.emailid,
                req.body.mobileno,
                req.body.otherno,
                req.body.department,
                req.body.current_address,
                req.body.current_stateid,
                req.body.current_cityid,
                req.body.current_pincode,
                req.body.permanent_address,
                req.body.permanent_stateid,
                req.body.permanent_cityid,
                req.body.permanent_pincode,
                req.body.createddate,
                req.body.createdtime,
                req.body.userid,
                req.body.employeeid
            ], function (error, result) {

                if (error) {



                    res.status(500).json({ status: false, message: 'Database Error Pls contact Backend Team...' })
                }
                else {
                    res.status(200).json({ status: true, message: 'Employee Record Updated Successfully...' })
                }

            })
    }
    catch (e) {
        res.status(500).json({ status: false, message: 'Critical Server Error...' })

    }
});
router.post('/delete_employee', function (req, res, next) {
    try {
        pool.query("delete from employees where employeeid=?", [req.body.employeeid], function (error, result) {

            if (error) {



                res.status(500).json({ status: false, message: 'Database Error Pls contact Backend Team...' })
            }
            else {
                res.status(200).json({ status: true, message: 'Employee Record Deleted Successfully...' })
            }

        })
    }
    catch (e) {
        res.status(500).json({ status: false, message: 'Critical Server Error...' })

    }
});


router.post('/edit_employeepicture', upload.single('employee_picture'), function (req, res, next) {
    try {
        pool.query("update employees set employee_picture=?,createddate=?,createdtime=?,userid=? where employeeid=?",
            [
                req.file.filename,
                req.body.createddate,
                req.body.createdtime,
                req.body.userid,
                req.body.employeeid
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
