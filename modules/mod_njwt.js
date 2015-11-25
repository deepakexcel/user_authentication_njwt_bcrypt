var nJwt = require('njwt');
var uuid = require('node-uuid');
var secret = uuid.v4();

module.exports = {
    getToken : function( claims, callback ){
        var jwt = nJwt.create(claims, secret);
        var token = jwt.compact();
        callback( token );
    },
    verifyToken: function( token, callback ){
        nJwt.verify( token, secret, function(err,verifiedToken){
            if(err){
                callback( false );
            }else{
                callback( true );
            }
        })
    }
}


