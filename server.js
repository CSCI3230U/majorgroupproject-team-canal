//Setting up important requires and some data
let express = require('express');
let app = express();
let session = require('express-session');
const { v4: uuidv4 } = require('uuid');
var fs = require('fs');
userData = ['',0,0,0];
const model = require('./database/handler/databasehandle.js');

//Basic information 
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(session({
    genid: uuidv4,
    resave: false,
    saveUninitialized: false,
    secret: 'this is probably unsecure',
}))

//Setting up view engine to deal with logins
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

//Testing to make sure the main function works
app.get('/', function (request, response) {
    console.log('testing');
});
//Redirects to user
app.get('/rules', function (request, response) {
    response.sendFile(__dirname + '/public/rules.html');
});
//Handler for the login function
app.post('/processLogin', function (request, response) {
    //Gets the username and password
    let username = request.body.username;
    let password = request.body.password;
    model.getUsernames(username, password, (conf) => {
        if (conf) {
            request.session.username = username;
            request.session.password = password;
            //Gets up to date records 
            model.getRecords(username, (scores) => {
                //Updates the local user value with the current user
                setUser([scores[0].wins, scores[0].losses, scores[0].ties])
                response.render('loginConfirmed', {
                    title: 'Login Succesful',
                    username: username
                });

            });
        }
        //If failed, throw an error
        else {
            response.render('login', {
                title: 'Login Page',
                errorMessage: 'Invalid Login'
            });
        }
    });
});
//Redirects to the view to handle a new user registration
app.get('/register', function (request, response) {
    response.render('register', { title: 'Register' });
});
//Processes the registration for a new user
app.post('/processRegistration', function (request, response) {
    //get sthe local user values
    let username = request.body.username;
    let password = request.body.password;
    let passwordC = request.body.confirmPassword;
    //Checks if the username is in use or not
    model.checkUsername(username, (conf) => {
        if (conf) {
            response.render('register', {
                title: 'Register',
                errorMessage: 'Username in use'
            });
            //If not in use, add to the database
        } else {
            if (password == passwordC && password.trim() != '') {
                model.registerUser(username, password);

                request.session.username = username;
                request.session.password = password;
                //Do the same procedure as login
                model.getRecords(username, (scores) => {
                    setUser([scores[0].wins, scores[0].losses, scores[0].ties])
                    response.render('loginConfirmed', {
                        title: 'Login Succesful',
                        username: username
                    });
                });
            }
            //If failed
            else {
                response.render('register', {
                    title: 'Register',
                    errorMessage: 'Invalid Password'
                });
            }
        }
    });
});
//Logout, remove the local user
app.get('/logout', function (request, response) {
    request.session.username = '';
    request.session.password = '';
    response.redirect('/login');
})
//Attempt to conect local and client data, didnt pan out
// app.get('/userScores', function (request, response) {
//     model.getUsers((users) => {
//         response.render('scores', {
//             title: 'High Scores',
//             database: users,
//             username: request.session.username
//         });
//     });
// });

app.get('/userScores', function (request, response) {
    model.getUsers((users) => {
        response.render('scores', {
            title: 'High Scores',
            database: users,
            username: request.session.username
        });
    });
});

//Updates user if a win occurs
app.get('/win', function (request, response) {
    if(request.session.username!=''){
    model.updateRankings(request.session.username,userData[1]+1,userData[2],userData[3], () => {
        console.log("Win Updated");
    });
    setUser([request.session.username,userData[1]+1,userData[2],userData[3]])

}
});
//Updates user if loss occurs
app.get('/loss', function (request, response) {
    if(request.session.username!=''){
    model.updateRankings(request.session.username,userData[1],userData[2]+1,userData[3], () => {
        console.log("Loss Updated");
    setUser([request.session.username,userData[1],userData[2]+1,userData[3]])

    });
}
});
//Updates use if tie occured
app.get('/tie', function (request, response) {
    if(request.session.username!=''){
    model.updateRankings(request.session.username,userData[1],userData[2],userData[3]+1, () => {
        console.log("Tie Updated");
    });
    setUser([request.session.username,userData[1],userData[2],userData[3]+1])
}
});


app.set('port', process.env.PORT || 4000);

app.listen(app.get('port'), function () {
    console.log(`Listening on port ${app.get('port')}`);
});
//Solving my issues through ineffecient means that probably leaves this site open to some form of attack
function setUser(user){
    userData=user;
}