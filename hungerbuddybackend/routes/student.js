var express = require('express');
var router = express.Router();
var upload = require('./multer')
var pool = require('./pool');

router.post('/submit_student', upload.single('student_picture'), function (req, res, next) {
    console.log(req.body);
    console.log(req.file);



    try {
        pool.query("insert into students(enrollmentno,branchid, batchid, sectionid, studentname,dob,gender, fathername, mothername, emailid, mobileno, fathercontactno, mothercontactno, current_address, current_stateid, current_cityid, current_pincode, permanent_address, permanent_stateid, permanent_cityid, permanent_pincode, student_picture,createddate,createdtime,userid) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
            [
                req.body.enrollmentno,
                req.body.branchid,
                req.body.batchid,
                req.body.sectionid,
                req.body.studentname,
                req.body.dob,
                req.body.gender,
                req.body.fathername,
                req.body.mothername,
                req.body.emailid,
                req.body.mobileno,
                req.body.fathercontactno,
                req.body.mothercontactno,
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
                    console.log(result);
                    res.status(200).json({ status: true,enrollmentno:result.insertId, message: 'Student Submitted Successfully...' })
                }

            })
    }
    catch (e) {
        res.status(500).json({ status: false, message: 'Critical Server Error...' })

    }
});
router.get('/fetch_all_student', function (req, res) {
    try {
        pool.query('select S.*,(select BR.branchname from branch BR where BR.branchid=S.branchid) as branchname,(select B.batchname from batch B where B.batchid=S.batchid) as batchname,(select SE.sectionname from section SE where SE.sectionid=S.sectionid) as sectionname,(select S.statename from states S where S.stateid=S.current_stateid) as currentstatename,(select C.cityname from cities C where C.cityid=S.current_cityid) as currentcityname,(select S.statename from states S where S.stateid=S.permanent_stateid) as permanentstatename,(select C.cityname from cities C where C.cityid=S.permanent_cityid) as permanentcityname from students S', function (error, result) {
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

router.post('/edit_student', function (req, res, next) {
    console.log(req.body);

    try {
        pool.query("update students set branchid=?, batchid=?, sectionid=?, studentname=?,dob=?,gender=?, fathername=?, mothername=?, emailid=?, mobileno=?, fathercontactno=?, mothercontactno=?, current_address=?, current_stateid=?, current_cityid=?, current_pincode=?, permanent_address=?, permanent_stateid=?, permanent_cityid=?, permanent_pincode=?,createddate=?,createdtime=?,userid=? where enrollmentno=?",
            [
                req.body.branchid,
                req.body.batchid,
                req.body.sectionid,
                req.body.studentname,
                req.body.dob,
                req.body.gender,
                req.body.fathername,
                req.body.mothername,
                req.body.emailid,
                req.body.mobileno,
                req.body.fathercontactno,
                req.body.mothercontactno,
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
                req.body.enrollmentno
            ], function (error, result) {

                if (error) {



                    res.status(500).json({ status: false, message: 'Database Error Pls contact Backend Team...' })
                }
                else {
                    res.status(200).json({ status: true, message: 'Student Record Updated Successfully...' })
                }

            })
    }
    catch (e) {
        res.status(500).json({ status: false, message: 'Critical Server Error...' })

    }
});
router.post('/delete_student', function (req, res, next) {
    try {
        pool.query("delete from students where enrollmentno=?", [req.body.enrollmentno], function (error, result) {

            if (error) {



                res.status(500).json({ status: false, message: 'Database Error Pls contact Backend Team...' })
            }
            else {
                res.status(200).json({ status: true, message: 'Student Record Deleted Successfully...' })
            }

        })
    }
    catch (e) {
        res.status(500).json({ status: false, message: 'Critical Server Error...' })

    }
});


router.post('/edit_studentpicture', upload.single('student_picture'), function (req, res, next) {
    try {
        pool.query("update students set student_picture=?,createddate=?,createdtime=?,userid=? where enrollmentno=?",
            [
                req.file.filename,
                req.body.createddate,
                req.body.createdtime,
                req.body.userid,
                req.body.enrollmentno
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
