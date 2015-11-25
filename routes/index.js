var express = require('express');
var router = express.Router();

var cookies = require('cookies');

var mod_njwt = require('../modules/mod_njwt');
var mod_bcrypt = require('../modules/mod_bcrypt');



router.get('/njwt_register',function(req,res,next){
    var user_name = 'admin'; // user input
    var password = 'admin_pwd1'; // user input
    
    //hash password before saving
    mod_bcrypt.encode_string( password, function( hash ){
        res.send( ' user registered');
    });
});

router.get('/njwt_login',function(req,res,next){
    var user_name = 'admin'; //user input
    var password = 'admin_pwd'; // user input
    
    var database_password = "$2a$10$IxNSOdWQ01Lh28SE8EArSOtz50yT4Wz8vYJNmTHeRc7mei4FL9FZa"; //password string which is saved in database for user admin
    
    mod_bcrypt.match( password, database_password, function( m ){
        if( m == true ){
            //if password matches
            var claims = {
                iss: user_name,
            };
            mod_njwt.getToken( claims, function(token){
                new cookies(req, res).set('access_token', token, {} );
                res.send('Authorized access');
            });
        }else{
            res.send('Unauthorized access');
        }
    });
});

router.get('/njwt_secure_page',function(req,res,next){
    var token = new cookies(req,res).get('access_token');
    mod_njwt.verifyToken( token, function( v ){
        if( v == true ){
            res.send('Authorized access');
        }else{
            res.send('Unauthorized access');
        }
    });
});

router.get('/njwt_logout', function(req, res, next){
    var token = new cookies(req,res).get('access_token');
    if (token){
        new cookies(req,res).set('access_token', null, {
            overwrite: true
        })
    }   
    res.send('logout');
})


module.exports = router;
