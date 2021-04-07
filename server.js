let express = require('express');


let app = express();

app.use(express.static('public'));


// first page
app.get('/', function(request, response) {
    response.send('Welcome to our page!');
});


app.set('port', process.env.PORT || 4000);

app.listen(app.get('port'), function(){
    //console.log(`listeining for requests on port 3000`);
    console.log(`Listening on port ${app.get('port')}`);

});