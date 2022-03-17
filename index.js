const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const urlEncodedParser = bodyParser.urlencoded({extended: false});

app.set('views', 'views');
app.set('view engine', 'hbs');
app.use(express.static('public'));

app.get('/', function (request, response){
    response.render('bmi');
});

app.post('/bmi-results', urlEncodedParser, function (request, response){
    const weight = request.body.weight;
    const height = request.body.height;
    const bmi = weight / (height * height);

    var answer;
    if (bmi < 18.5){
        answer = "You are underweight, bmi: " + bmi;
    }else if (bmi >= 18.5 && bmi <= 24.9){
        answer = "Your weight is normal, bmi: " + bmi;
    }else if (bmi >= 25 && bmi <= 29.9){
        answer = "You are overweight, bmi: " + bmi;
    }else if (bmi >= 30){
        answer = "You are obese, bmi: " + bmi;
    }
    response.render("results", {message: answer});
});

app.listen(port);
console.log(`Server is listening on port ${port}`);