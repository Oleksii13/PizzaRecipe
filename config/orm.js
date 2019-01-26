let connection = require("./connection.js");

let orm = {
    insertOne: (colOne, colTwo, colThree, colFour, colFive, valOne, valTwo, valThree, valFour, valFive, cb) => {
        var queryString = "INSERT INTO recipe (??,??,??,??,??) VALUES (?,?,?,?,?)";

        valThree = parseInt(valThree);

        connection.query(queryString, [colOne, colTwo, colThree, colFour, colFive, valOne, valTwo, valThree, valFour, valFive], (err, result) => {
            if (err) throw err;
            console.log(result);
            cb(result);
        });
    },

    all: function (tableInput, cb) {
        var queryString = "SELECT * FROM " + tableInput + ";";
        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },

    selectAll: function (tableInput, cb) {
        var queryString = "SELECT * FROM " + tableInput + ";";
        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },

    selectUser: function (clause, cb) {
        var queryString = "select * from recipe where user_id=(?)";
        connection.query(queryString, [clause], function (err, result) {

            if (err) {
                throw err;
            }
            cb(result);
        });
    }
};

module.exports = orm;