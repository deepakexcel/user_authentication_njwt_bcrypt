var bcrypt = require('bcrypt');

module.exports = {
    encode_string : function( string, callback ){
        bcrypt.hash( string, 10, function(err, hash){
            callback( hash );
        });
    },
    match : function( p1, p2, callback ){
        bcrypt.compare( p1, p2, function(err, val){
            if (val){
                callback( true );
            }else{
                callback( false );
            }
        })
        
    } 
}


