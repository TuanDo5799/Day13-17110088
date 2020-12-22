const express = require('express');
const app = express();
const PORT = 2999;
const mysql = require('mysql');
const bodyParser = require('body-parser');
const connection = mysql.createConnection({
  host: 'localhost',
  database: 'erm',
  user: 'root',
  password: ''
});
connection.connect();
app.use(express.static('static'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/employers', function(req, res){
  connection.query('SELECT * FROM employers', function(err, result){
    if (err) {
      console.log(err.toString());
      return res.send(500);
    }
    console.log(result);
    res.json(result);
  });
});

app.put('/employers', function(req, res){
  if (!req.body || !req.body.id) return res.sendStatus(400);
  var id = req.body.id;
  var name = req.body.name;
  var status = req.body.status;
  var contact = req.body.contact_person;
  var email = req.body.email;
  var phone = req.body.phone;
  var address = req.body.address;
  var notes = req.body.notes;
  connection.query(`UPDATE employers SET
    name='${name}', status='${status}', contact_person='${contact}',
    email='${email}', phone='${phone}', address='${address}', notes='${notes}'
    WHERE id=${id}`, function(err, result){
      if (err){
        console.log(err.toString());
        return res.sendStatus(500);
      }
      console.log("PUT request to /employers returned "+JSON.stringify(result));
      res.json(result);
  });
});

app.post('/employers', function(req, res){
  var name = req.body.name;
  var status = req.body.status;
  var contact = req.body.contact_person;
  var email = req.body.email;
  var phone = req.body.phone;
  var address = req.body.address;
  var notes = req.body.notes;
  connection.query(`INSERT INTO employers (name, status, contact_person, email, phone, address, notes)
  VALUES ('${name}', '${status}', '${contact}','${email}', '${phone}', '${address}',
    '${notes}')`, function(err, result){
      if (err){
        console.log(err.toString());
        return res.sendStatus(500);
      }
      console.log("POST request to /employers returned "+JSON.stringify(result));
      res.json(result);
  });
});


app.listen(PORT, function(){
  console.log("server listening on port "+PORT);
});
