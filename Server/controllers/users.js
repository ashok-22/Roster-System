const jwt = require('jsonwebtoken');

isLoggedIn = (req, res, next) => {
      const authHeader = req.headers["authorization"]
      const token = authHeader && authHeader.split(' ')[1];
      console.log(token)
      jwt.verify(token,'SECRETKEY',(err,decoded)=>{
        if (err){
          return res.status(401).send({ auth: false, message: 'Failed to authenticate token - Invalid Session.' });
        }
        req.user=decoded
      next();
      }   
      );
  }

  module.exports=isLoggedIn;