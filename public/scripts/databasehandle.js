const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./public/data/users.db', (err) => {
    if (err) {
        console.error('Error while connecting to database: ', err);
    } else {
        console.log('Connected to or created SQLite database');
    }
});

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

function getUsername(){
    db.all('SELECT username FROM users', (err, username) => {
        if (err){
            console.error('Error getting results');
        }
        else{
            return(username);
        }
    });
}

function getPasswords(){
    db.all('SELECT password FROM users', (err, password) => {
        if (err){
            console.error('Error getting results');
        }
        else{
            return(password);
        }
    });
}

module.exports.getUsers = getUsers;
module.exports.getUsername = getUsername;
module.exports.getPasswords = getPasswords;
