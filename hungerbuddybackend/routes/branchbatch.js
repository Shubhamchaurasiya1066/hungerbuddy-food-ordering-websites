var express = require('express');
var router = express.Router();
var pool = require('./pool');
/* GET home page. */
router.get('/fetch_branch', function(req, res, next) {
    pool.query("select * from branch",function(error,result){
          if (error) {

                res.status(500).json({ status: false, message: 'Database Error Pls contact Backend Team...' })
            }
            else {
                res.status(200).json({ status: true, message: 'Success',data:result})
            }
    })
  
});
router.post('/fetch_batch',function(req,res){

    pool.query('select * from batch where branchid=?',[req.body.branchid],function(error,result){
        
        if(error){
            res.status(500).json({status:false,message:'Database Error Pls contact Backend Team...'})
        }
        else{
            res.status(200).json({status:true,message:'Success',data:result})
        }
    })
})

router.post('/fetch_section',function(req,res){

    pool.query('select * from section where batchid=?',[req.body.batchid],function(error,result){
        
        if(error){
            res.status(500).json({status:false,message:'Database Error Pls contact Backend Team...'})
        }
        else{
            res.status(200).json({status:true,message:'Success',data:result})
        }
    })
})


module.exports = router;