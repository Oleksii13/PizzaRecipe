let orm = require("../config/orm");

let pizza = {

    insertOne: (valOne, valTwo, valThree, valFour, valFive, cb) => {
        orm.insertOne('recipe', 'ingredients', 'calories', 'user_id', 'title', valOne, valTwo, valThree, valFour, valFive, (res) => {
            cb(res);
        })
    },

    all: function (cb) {
        orm.all("recipe", function (res) {
            cb(res);
        });
    },
    selectAll: (cb) => {
        orm.selectAll('recipe', (res) => {
            cb(res);
        });
    },

    selectUser: (clause, cb) => {
        orm.selectUser(clause, (res) => {
            cb(res);
        });
    }
};

module.exports = pizza;