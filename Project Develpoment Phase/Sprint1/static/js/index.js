var con = require('./connection');
var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',function(req, res){
    res.sendFile(__dirname+'/register.html');

});
app.post('/',function(req, res){
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var confirmpassword = req.body.confirmpassword;


    con.connect(function(error){
        if(error) throw error;
        var sql = "INSERT INTO student(name, email, password,confirmpassword) VALUES('"+name+"','"+email+"','"+password+"','"+confirmpassword+"')";
        con.query(sql, function(error, result){

            if(error) throw error;
            res.send('user register successfull' +result.insertId);
        });

    });


});

app.listen(3000, () => {
    console.log("Server Listening in port 3000");
})
