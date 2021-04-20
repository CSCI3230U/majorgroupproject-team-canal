let express = require('express');
let app = express();
let session = require('express-session');
const { v4: uuidv4 } = require('uuid');
var fs = require('fs');
userData = [0,0,0];
const model = require('./database/handler/databasehandle.js');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(session({
    genid: uuidv4,
    resave: false,
    saveUninitialized: false,
    secret: 'this is probably unsecure',
}))

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.get('/newGame', function (request, response) {
    response.render('newGame', {
        title: 'New Game',
        message: 'This is a New Game Page'
    });
});

app.get('/login', function (request, response) {
    response.render('login', {
        title: 'Login Page',
        errorMessage: ''
    });
});

app.get('/', function (request, response) {
    response.send('Welcome to our page!');
});

app.get('/rules', function (request, response) {
    response.sendFile(__dirname + '/public/rules.html');
});

app.post('/processLogin', function (request, response) {
    let username = request.body.username;
    let password = request.body.password;
    model.getUsernames(username, password, (conf) => {
        if (conf) {
            request.session.username = username;
            request.session.password = password;
            model.getRecords(username, (scores) => {
                setUser([scores[0].wins, scores[0].losses, scores[0].ties])
                response.render('loginConfirmed', {
                    title: 'Login Succesful',
                    username: username
                });

            });
        }
        else {
            response.render('login', {
                title: 'Login Page',
                errorMessage: 'Invalid Login'
            });
        }
    });
});

app.get('/register', function (request, response) {
    response.render('register', { title: 'Register' });
});

app.post('/processRegistration', function (request, response) {
    let username = request.body.username;
    let password = request.body.password;
    let passwordC = request.body.confirmPassword;
    model.checkUsername(username, (conf) => {
        if (conf) {
            response.render('register', {
                title: 'Register',
                errorMessage: 'Username in use'
            });
        } else {
            if (password == passwordC && password.trim() != '') {
                model.registerUser(username, password);

                request.session.username = username;
                request.session.password = password;
                model.getRecords(username, (scores) => {
                    setUser([scores[0].wins, scores[0].losses, scores[0].ties])
                    response.render('loginConfirmed', {
                        title: 'Login Succesful',
                        username: username
                    });
                });
            }
            else {
                response.render('register', {
                    title: 'Register',
                    errorMessage: 'Invalid Password'
                });
            }
        }
    });
});

app.get('/logout', function (request, response) {
    request.session.username = '';
    request.session.password = '';
    response.redirect('/login');
})

app.get('/userScores', function (request, response) {
    model.getUsers((users) => {
        response.render('scores', {
            title: 'High Scores',
            database: users,
            username: request.session.username
        });
    });
});

app.get('/win', function (request, response) {
    if(username!=''){
    model.updateRankings(users,userData[0]+1,userData[1],userData[2], () => {
        console.log("Win Updated")
    });
}
});

app.get('/loss', function (request, response) {
    if(username!=''){
    model.updateRankings(users,userData[0],userData[1]+1,userData[2], () => {
        console.log("Loss Updated")
    });
}
});

app.get('/tie', function (request, response) {
    if(username!=''){
    model.updateRankings(users,userData[0],userData[1],userData[2]+1, () => {
        console.log("Tie Updated")
    });
}
});




// app.get('/currentUser', function (request, response) {
//     response.write(getUserData(), 'utf8', ()=>{
//         console.log('writing data');
//     });
//     response.end('ok');
// });


app.set('port', process.env.PORT || 4000);

app.listen(app.get('port'), function () {
    console.log(`Listening on port ${app.get('port')}`);
});
//Solving my issues through ineffecient means that probably leaves this site open to some form of attack
function setUser(user){
    userData=user;
}