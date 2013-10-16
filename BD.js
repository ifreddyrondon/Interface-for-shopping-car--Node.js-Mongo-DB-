var mysql = require('mysql')
	,	mongoose = require('mongoose');

exports.BD = function() {  
                var connection = mysql.createConnection({
                socketPath : '/Applications/MAMP/tmp/mysql/mysql.sock',
                user : 'root',
                password : 'yourpassword',
                database : 'kiosco',
                });
        return connection;
}

exports.mongodb = function() {  
	db_lnk = 'mongodb://localhost/kiosko';
	db = mongoose.createConnection(db_lnk);
	return db;
}