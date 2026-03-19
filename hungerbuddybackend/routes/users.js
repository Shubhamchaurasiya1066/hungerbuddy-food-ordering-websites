var express = require('express');
var router = express.Router();
var pool=require('./pool')
/* GET users listing. */

router.post("/submit_order", function (req, res, next) {
  try {
    pool.query(
      "insert into orders(paymentid,orderdate,delivery_status,payment_type) values(?,?,?,?)",
      [
        req.body.paymentid,
        req.body.orderdate,
        req.body.delivery_status,
        req.body.payment_type,
      ],
      function (error, result) {
        if (error) {
          console.log(error);
          res.status(500).json({
            status: false,
            message: "Database Error Please Contact Bankend Team....",
          });
        } else {
          res.status(200).json({
            status: true,
            orderid: result.insertId,
            message: "Order Submitted Successfully....",
          });
        }
      }
    );
  } catch (e) {
    res.status(500).json({
      status: false,
      message: "Critical Error Please Contact Bankend Team....",
    });
  }
});

router.post("/submit_order_detail", function (req, res, next) {
  try {
    pool.query(
      "insert into order_detail(orderid,fooditemid,fooditemname,enrollmentno,emailid,mobileno,qty,rate,offerrate,amount) values ?",
      [
        req.body.data.map((item) => [
          req.body.orderid,
          item.fooditemid,
          item.fooditemname,
          req.body.enrollmentno,
          req.body.emailid,
          req.body.mobileno,
          item.qty,
          item.fullprice,
          item.offerprice,
          item.offerprice > 0
            ? item.offerprice * item.qty
            : item.fullprice * item.qty,
        ]),
      ],
      function (error, result) {
        if (error) {
          console.log(error);
          res.status(500).json({
            status: false,
            message: "Database Error Please Contact Bankend Team....",
          });
        } else {
          res.status(200).json({
            status: true,
            message: "Order Detail Submitted Successfully....",
          });
        }
      }
    );
  } catch (e) {
    res.status(500).json({
      status: false,
      message: "Critical Error Please Contact Bankend Team....",
    });
  }
});

router.get('/fetch_all_category', function (req, res) {
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

router.post('/fetch_all_fooditem_by_category', function (req, res) {
    try {
        pool.query('select F.*,(select B.branchname from branch B where B.branchid=F.branchid) as branchname,(select C.categoryname from foodcategory C where C.categoryid=F.foodcategoryid) as foodcategoryname from fooditems F where F.foodcategoryid in(select categoryid from foodcategory where categoryname=?)',[req.body.categoryname], function (error, result) {
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
router.post('/fetch_all_fooditem_by_food_and_category', function (req, res) {
    try {
        pool.query('select F.*,(select B.branchname from branch B where B.branchid=F.branchid) as branchname,(select C.categoryname from foodcategory C where C.categoryid=F.foodcategoryid) as foodcategoryname from fooditems F where F.foodcategoryid in(select categoryid from foodcategory where categoryname=?) or F.fooditemname=?',[req.body.categoryname,req.body.categoryname], function (error, result) {
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
router.post('/fetch_all_fooditem_by_category_id', function (req, res) {
    try {
        pool.query('select F.*,(select B.branchname from branch B where B.branchid=F.branchid) as branchname,(select C.categoryname from foodcategory C where C.categoryid=F.foodcategoryid) as foodcategoryname from fooditems F where F.foodcategoryid=?',[req.body.foodcategoryid], function (error, result) {
            if (error) {

                res.status(500).json({ status: false, message: 'Database Error Pls contact Backend Team...' })
            }
            else {
                console.log(result)

                res.status(200).json({ data: result, status: true, message: 'Success...' })
            }
        })
    }
    catch (e) {
        res.status(500).json({ status: false, message: 'Critical Server Error...' })

    }
})

router.get('/fetch_all_fooditem', function (req, res) {
    try {
        pool.query('select F.*,(select B.branchname from branch B where B.branchid=F.branchid) as branchname,(select C.categoryname from foodcategory C where C.categoryid=F.foodcategoryid) as foodcategoryname from fooditems F ', function (error, result) {
            if (error) {
              console.log(error);
              
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
router.post('/fetch_all_fooditem_by_id', function (req, res) {
    try {
        pool.query('select F.*,(select B.branchname from branch B where B.branchid=F.branchid) as branchname,(select C.categoryname from foodcategory C where C.categoryid=F.foodcategoryid) as foodcategoryname from fooditems F where fooditemid=?',[req.body.fooditemid], function (error, result) {
            if (error) {
                console.log(error)

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
router.post('/student_sign_in', function (req, res) {
    try {
        pool.query('select S.*,(select CS.statename from states CS where CS.stateid=S.current_stateid) as currentstatename,(select C.cityname from cities C where C.cityid=S.current_cityid) as currentcityname from students S where S.mobileno=?',[req.body.mobileNo], function (error, result) {
            if (error) {
                res.status(500).json({ status: false, message: 'Database Error Pls contact Backend Team...' })
            }
            else {
                if(result.length==1)
                res.status(200).json({ data:result[0], status: true, message: 'Success...' })
                else{
                res.status(200).json({ data:[], status: false, message: 'you are not registered yet...Pls contact Branch Adminstrator' })

                }
            }
        })
    }
    catch (e) {
        res.status(500).json({ status: false, message: 'Critical Server Error...' })

    }
})
router.post("/fetch_all_Statecity", function (req, res) {
  pool.query(
    "select st.*,(select S.statename from states S where S.stateid=st.current_stateid) as statename,(select C.cityname from cities C where C.cityid=st.current_cityid) as cityname from students st where enrollmentno=?",
    [req.body.enrollmentno],
    function (error, result) {
      if (error) {
        console.log(error);
        res.status(500).json({
          status: false,
          message: "Database Error Please Contact Backend Team....",
        });
      } else {
        res
          .status(200)
          .json({ status: true, message: "success", data: result });
      }
    },
  );
});

router.post("/fetch_all_order_details", function (req, res) {
  try {
    pool.query(
      "select F.*,OD.*,O.* from fooditems F, order_detail OD,orders O where OD.orderid=O.orderid and OD.fooditemid=F.fooditemid and OD.mobileno=?",
      [req.body.mobileno],
      function (error, result) {
        if (error) {
          console.log(error);
          res
            .status(500)
            .json({
              status: false,
              message: "Database Error Please Contact Bankend Team....",
            });
        } else {
          res
            .status(200)
            .json({ data: result, status: true, message: "success" });
        }
      },
    );
  } catch (e) {
    res
      .status(500)
      .json({
        status: false,
        message: "Database Error Please Contact Bankend Team....",
      });
  }
});
 
module.exports = router;
