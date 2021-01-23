const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../configs/mysql.config');
const checkLogin = require("../controllers/users")

router.post('/sign-up', (req, res, next) => {});

router.post('/login', (req, res, next) => {

    db.query(`SELECT * FROM Employees where Account=${db.escape(req.body.account01)}`,(err,results)=>{
        if(err){
          return res.status(400).send({msg:err})
        }
        if(results.length>0){
            if(results[0].Password==req.body.password){
                const token = jwt.sign({
                    username: results[0].Name,
                    userId: results[0].Account
                  },
                  'SECRETKEY', {
                    expiresIn: '1800s'
                  }
                );
                return res.status(200).send({
                  auth:true,
                  message: 'Logged in!',
                  token
                }); 
            }
            else{
                res.status(401).send({ auth: false, message: 'Password Incorrect' })
            }
        }       
        else{
            res.status(404).send({ auth: false, message: 'User does not exist' })
        }
    })
})
router.get('/dashboard',checkLogin, (req, res) => {
  db.query(`SELECT * FROM Employees where Account=${db.escape(req.user.userId)}`,(err,results)=>{
    if(err){
      return res.status(400).send({msg:err})
    }
    if(results.length>0){
      res.json(results[0]);
    }
  })
});

router.post('/apply-leave',checkLogin,(req,res)=>{
  db.query(`INSERT INTO LEAVES (account,fromd,tod,reason,backup) values(${db.escape(req.user.userId)},${db.escape(req.body.fdate)},${db.escape(req.body.tdate)},${db.escape(req.body.reason)},${db.escape(req.body.backup)})`,(err,fields,results)=>{
    if(err){
      return res.status(500).send({msg:err})
    }
    res.status(200).send({"msg":"Leave Applied Successfully"});
  });
})

router.get('/getleaves',checkLogin,(req,res)=>{
  db.query(`SELECT * FROM Leaves where account=${db.escape(req.user.userId)}`,(err,results)=>{
    if(err){
      return res.status(500).send({msg:err})
    }
    if(results.length>0){
      res.json(results);
    }
  })
})

router.delete('/delete-leave',checkLogin,(req,res)=>{
  db.query(`DELETE FROM Leaves where id=${db.escape(req.query.id)}`,(err, rows, fields)=>{
    if(err){
      return res.status(500).send({msg:err})
    }
    console.log(rows,fields)
    res.status(200).send({"msg":"Leave cancelled successfully"});
  })
})




module.exports = router;