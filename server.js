let express = require('express');
let app = express();
let session = require('express-session');
const { v4: uuidv4 } = require('uuid');

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

// first page
app.get('/', function(request, response) {
    response.send('Welcome to our page!');
});

//Test data


app.set('port', process.env.PORT || 4000);

app.listen(app.get('port'), function(){
    //console.log(`listeining for requests on port 3000`);
    console.log(`Listening on port ${app.get('port')}`);
});