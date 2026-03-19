var express = require('express');
var router = express.Router();
var upload = require('./multer')
var pool = require('./pool');

router.post('/submit_fooditem', upload.single('picture'), function (req, res) {
    console.log(req.body);
    
    try {
        pool.query('insert into fooditems(branchid,foodcategoryid,fooditemname, fooditemtype, fooditemtaste, ingredients, fullprice, halfprice, offerprice, status, ratings, picture, createddate, createdtime,userid) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
            [
                req.body.branchid,
                req.body.foodcategoryid,
                req.body.fooditemname,
                req.body.fooditemtype,
                req.body.fooditemtaste,
                req.body.ingredients,
                req.body.fullprice,
                req.body.halfprice,
                req.body.offerprice,
                req.body.status,
                req.body.ratings,
                req.file.filename,
                req.body.createddate,
                req.body.createdtime,
                req.body.userid],
            function (error, result) {

                if (error) {
                    console.log(error);



                    res.status(500).json({ status: false, message: 'Database Error Pls contact Backend Team...' })
                }


                else {
                    console.log(result);
                    res.status(200).json({ status: true, message: 'Food Item Submitted Successfully...' })
                }

            })
    }


    catch (e) {
        res.status(500).json({ status: false, message: 'Critical Server Error...' })

    }

})
router.get('/fetch_all_fooditem', function (req, res) {
    try {
        pool.query('select F.*,(select B.branchname from branch B where B.branchid=F.branchid) as branchname,(select C.categoryname from foodcategory C where C.categoryid=F.foodcategoryid) as foodcategoryname from fooditems F', function (error, result) {
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

router.post('/edit_fooditem', function (req, res) {
    try {
        pool.query('update fooditems set branchid=?,foodcategoryid=?, fooditemname=?, fooditemtype=?, fooditemtaste=?, ingredients=?, fullprice=?, halfprice=?, offerprice=?, status=?, ratings=?,createddate=?, createdtime=?,userid=? where fooditemid=?',
            [
                req.body.branchid,
                req.body.foodcategoryid,
                req.body.fooditemname,
                req.body.fooditemtype,
                req.body.fooditemtaste,
                req.body.ingredients,
                req.body.fullprice,
                req.body.halfprice,
                req.body.offerprice,
                req.body.status,
                req.body.ratings,
                req.body.createddate,
                req.body.createdtime,
                req.body.userid,
                req.body.fooditemid],
            function (error, result) {

                if (error) {
                    console.log(error);



                    res.status(500).json({ status: false, message: 'Database Error Pls contact Backend Team...' })
                }


                else {
                    console.log(result);
                    res.status(200).json({ status: true, message: 'Food Item Edited Successfully...' })
                }

            })
    }


    catch (e) {
        res.status(500).json({ status: false, message: 'Critical Server Error...' })

    }

})
router.post('/delete_fooditem', function (req, res) {
    try {
        pool.query('delete from fooditems where fooditemid=?',

            [req.body.fooditemid],
            function (error, result) {

                if (error) {
                    console.log(error);



                    res.status(500).json({ status: false, message: 'Database Error Pls contact Backend Team...' })
                }


                else {
                    console.log(result);
                    res.status(200).json({ status: true, message: 'Food Item Deleted Successfully...' })
                }

            })
    }


    catch (e) {
        res.status(500).json({ status: false, message: 'Critical Server Error...' })

    }

})

router.post('/edit_foodpicture', upload.single('picture'), function (req, res) {
    console.log(req.body);
    
    try {
        pool.query('update fooditems set picture=?,createddate=?,createdtime=?,userid=? where fooditemid=?',
            [
                req.file.filename,
                req.body.createddate,
                req.body.createdtime,
                req.body.userid,
                req.body.fooditemid
            ],
            function (error, result) {
                if (error) {



                    res.status(500).json({ status: false, message: 'Database Error Pls contact Backend Team...' })
                }
                else {
                    res.status(200).json({ status: true, message: 'Picture Updated Successfully...' })
                }
            }
        )
    }
    catch (e) {
        res.status(500).json({ status: false, message: 'Critical Server Error...' })

    }
})

router.get('/fetch_categoryname',function(req,res){
    try{
   
        pool.query('select * from foodcategory',function(error,result){
             if(error){
            res.status(500).json({status:false,message:'Database Error Pls contact Backend Team...'})
        }
        else{
            res.status(200).json({status:true,message:'Success',data:result})
        }
        })
    }
    catch(e){
        res.status(500).json({ status: false, message: 'Critical Server Error...' })
    }
})
router.post('/fetch_branchname',function(req,res){
    try{
   
        pool.query('select branchname from branch where branchid=?',[req.body.branchid],function(error,result){
             if(error){
            res.status(500).json({status:false,message:'Database Error Pls contact Backend Team...'})
        }
        else{
            res.status(200).json({status:true,message:'Success',data:result})
        }
        })
    }
    catch(e){
        res.status(500).json({ status: false, message: 'Critical Server Error...' })
    }
})
module.exports = router