const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database/model/users.db', (err) => {
    if (err) {
        console.error('Error while connecting to database: ', err);
    } else {
        console.log('Connected to or created SQLite database');
    }
});

//Just ignore the fact passwords are encoded in plain text formatting, clearly the secure choice of passwords
db.serialize(() => {
    db.run('DROP TABLE users')
      .run(`CREATE TABLE users(userId INTEGER PRIMARY KEY,
                                username TEXT,
                                password TEXT,
                                highScore NUMERIC DEFAULT 0,
                                message TEXT)`)
    .run(`INSERT INTO users(username, password, highscore, message) VALUES(?, ?, ?, ?)`,
        ['admin', 'sasageyo', 0, 'The first one']);
});

function getUsers(callback){
    db.all('SELECT username, highScore, message FROM users', (err, users) => {
        if (err){
            console.error('Error getting usernames');
        }
        else{
            callback(users);
        }
    });
}

function getUsernames(user, pass, callback){
    
     db.all('SELECT username, password FROM users', function(err, users){
        var r = false;
        if (err){
            console.error('Error getting results');
        }
        else{
            users.forEach((result)=>{
                if(result.username==user){
                    if(result.password==pass){
                        r = true;
                    }
                } 
            });
        }
        callback(r);
    });
    
}

function checkUsername(user, callback) {
    db.all('SELECT username FROM users', function (err, users) {
        var r = false;
        if (err) {
            console.error('Error getting results');
        }
        else {
            users.forEach((result) => {
                console.log(result.username)
                if (result.username == user) {
                    r = true;
                }
            });
        }
        callback(r);
    });
}

function registerUser(user, pass) {
    db.run('INSERT INTO users(username, password) VALUES(?, ?)', [user, pass], (err) => {
        if (err) {
            console.error('Error inserting into database: ', err);
        }
    });
}
module.exports.getUsers = getUsers;
module.exports.getUsernames = getUsernames;
module.exports.checkUsername = checkUsername;
module.exports.registerUser = registerUser;
