let express = require('express');
let app = express();
let session = require('express-session');
const { v4: uuidv4 } = require('uuid');

const model = require('./public/scripts/databasehandle.js');


app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));
app.use(session({
    genid: uuidv4,
    resave: false,
    saveUninitialized: false,
    secret: 'shinzou wo sasageyo why',
}))

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

function userExists(user, pass){
    users = model.getUsernames(user)
    passwords = 
};

app.get('/newGame', function(request, response) {
    response.render('newGame', {
        title: 'New Game',
        message: 'This is a New Game Page'
    });
});

app.get('/login', function(request, response){
    response.render('login', {
        title: 'Login Page',
        errorMessage: ''
    });
});

app.get('/', function(request, response) {
    response.send('Welcome to our page!');
});

app.post('/processLogin', function(request, response){
    let username= request.body.username;
    let password= request.body.password;

    if(userExists(username, password)){
        request.session.username = username;
        request.session.password = password;

        response.render('loginConfirmed', {
            title: 'Login Succesful',
            username: username
        });
    } 
    else{
        response.render('login', {
            title: 'Login Page',
            errorMessage: 'Invalid Login'
        })
    }
});

app.get('/register', function(request, response){
    response.render('register', {title:'Register'});
});
app.post('/processRegistration', function(request, response){
    let username = request.body.username;
    let password = request.body.password;
    let passwordC = request.body.confirmPassword;

    if (userExists(username)) {
        response.render('register', {
            title: 'Register',
            errorMessage: 'Username in use'
        });
      } else {
        usernames.push(username);
    
        request.session.username = username;
        request.session.password=password;

        response.render('loginConfirmed', {
            title: 'Login Succesful',
            username: username
        });
      }
});

app.get('/logout', function(request, response){
    request.session.username='';
    request.session.password='';
    response.redirect('/login')
})

app.get('/userScores', function(request, response){
    model.getUsers((users) =>{
        response.render('scores', {
            title: 'High Scores',
            database : users
        });
    });
});

app.set('port', process.env.PORT || 4000);

app.listen(app.get('port'), function(){
    console.log(`Listening on port ${app.get('port')}`);
});