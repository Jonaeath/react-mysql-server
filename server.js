const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express()


const port = process.env.PORT || 4000;

app.use(cors())
app.use(express.json());

const db = mysql.createConnection({
    host:"localhost",
    user:'root',
    password:'',
    database:'collage'
})

app.get('/',async(req,res)=>{
    const sql = "SELECT * FROM users";
    db.query(sql,(err,data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.post('/users',(req, res)=>{
    const sql = "INSERT INTO users (`username`,`email`) VALUES (?)";
    const values = [
        req.body.username,
        req.body.email

    ]
    db.query(sql,[values], (err, result)=>{
        if(err) return res.json(err);
        return res.json(result);
    })
})


app.get("/", async(req, res) => {
    res.send("Test server is running");
  });
  
  app.listen(port, () => console.log(`Test Server running on ${port}`));