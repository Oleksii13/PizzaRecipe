let mysql = require("mysql");

let connection;

if (process.env.JAWSDB_URL)
    // DB is JawsDB on Heroku
    connection = mysql.createConnection(process.env.JAWSDB_URL);
else
    // DB is local on localhost
    connection = mysql.createConnection({
        port: 3306,
        host: 'localhost',
        user: 'root',
        password: 'redginger2',
        //password: 'pass',
        database: 'pizza_recipe_db'
    });

// Establish connection to MySQL
connection.connect((err) => {
    if (err) {
        console.error(`error connecting MySQL: ${err.stack} \n`);
        return;
    }
    console.log(`Connected to MySQL as id ${connection.threadId} \n`);
});

// Export connection
module.exports = connection;