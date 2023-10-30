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

app.get('/read/:id',async(req,res)=>{
    const sql = "SELECT * FROM users WHERE id = ?";
    const id = req.params.id;
    db.query(sql,[id], (err,data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})


app.put('/update/:id',(req,res)=>{
    const sql = 'UPDATE users SET `username`=?, `email`=? WHERE id=?';
    const id = req.params.id;
    db.query(sql, [req.body.username, req.body.email, id], (err, result)=>{
        if(err) return res.json({message:"Inside Server Error"});
        return res.json(result);
    })
})

app.delete('/delete/:id',(req,res)=>{
    const sql = "DELETE FROM users WHERE id=?";
    const id = req.params.id;
    db.query(sql, [id], (err, result)=>{
        if(err) return res.json({message:"Inside Server Error"});
        return res.json(result);
    })
})


app.get("/", async(req, res) => {
    res.send("Test server is running");
  });
  
  app.listen(port, () => console.log(`Test Server running on ${port}`));