var express = require('express');
var router = express.Router();
var pool = require('./pool');
const { route } = require('./employee');

router.post('/submit_studentwallet',function(req,res){
   try{
    pool.query('insert into student_wallet(enrollmentno,points) values(?,?)',
        [
            req.body.enrollmentno,
            req.body.points
        ],function(error,result){
        
           if (error) {

                    res.status(500).json({ status: false, message: 'Database Error Pls contact Backend Team...' })
                }

                else {

                    res.status(200).json({ status: true, })
                }
        })
   }
   catch(e){

        res.status(500).json({ status: false, message: 'Critical Server Error...' })

   }
})

router.post('/submit_employeewallet',function(req,res){
    console.log(req.body);
    
   try{
    pool.query('insert into employee_wallet (employeeid,ponits) values(?,?)',
        [
            req.body.employeeid,
            req.body.points
        ],function(error,result){
        
           if (error) {

                    res.status(500).json({ status: false, message: 'Database Error Pls contact Backend Team...' })
                }

                else {

                    res.status(200).json({ status: true, })
                }
        })
   }
   catch(e){

        res.status(500).json({ status: false, message: 'Critical Server Error...' })

   }
})
module.exports=router