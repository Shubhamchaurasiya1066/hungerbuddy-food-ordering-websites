var express = require('express');
var router = express.Router();
var upload = require('./multer')
var pool = require('./pool')
var dotenv = require('dotenv')
var jsonwebtoken = require('jsonwebtoken')
dotenv.config()
/* GET home page. */
router.post('/chk_branch_login', function (req, res, next) {
  console.log(req.body)
  try {
    pool.query('select * from branch where emailid=? and password=?', [req.body.emailid, req.body.password], function (error, result) {
      if (error) {
        console.log(error)
        res.status(500).json({ status: false, message: 'Database Error Please Contact Bankend Team....' })
      }
      else {
        console.log(result.length)
        if (result.length == 1) {
           console.log(result)
          var sk = process.env.JWT_KEY
          var token = jsonwebtoken.sign({ branch_admin: result[0] }, sk, { expiresIn: '1h' })
          console.log(token)
          res.status(200).json({ token: token, data: result[0], status: true, message: 'success' })
        }
        else
          res.status(500).json({ status: false, message: 'Invalid emailid/password' })
      }
    })
  }
  catch (e) {

    res.status(500).json({ status: false, message: 'Critical Error Please Contact Bankend Team....' })
  }
});


module.exports = router;
