var express = require('express')
var app = express();
const cors = require("cors")
const bodyparser = require("body-parser")
const jwt=require("jsonwebtoken")
const db=require('./configs/mysql.config');
var router = require("./routes/router.js")

app.use(express.json({
    verify : (req, res, buf, encoding) => {
      try {
        JSON.parse(buf);
      } catch(e) {
        res.status(404).send('Invalid Request');
      }
    }
  }));

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended : true}));
app.use(cors())


app.use('/api', router)



app.listen(4000,()=>{
    console.log("Server running at port 4000")
})