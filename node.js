const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();

questions = [
    "3 1 4 1 5",
    "1 1 2 3 5",
    "1 4 9 16 25",
    "2 3 5 7 11",
    "1 2 4 8 16",
];

answers = [9, 8, 36, 13, 32];

app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(session({
    secret: 'ssshhhhh   ',
    resave: true,
    saveUninitialized: true
}));


app.get('/', (req, res) => {
    req.session.questionIndex = 0;
    req.session.correctAnswers = 0;
    res.render('numberquiz', {
        sequence: questions[0],
        correctAnswers: 0
    });
});
app.post('/', (req, res) => {
    if (req.session) {

        var questionIndex = parseInt(req.session.questionIndex);
        var answer = parseInt(req.body.answer);

        if (answer === parseInt(answers[questionIndex])) {
            req.session.correctAnswers = parseInt(req.session.correctAnswers) + 1;
        }

        req.session.questionIndex = ++questionIndex;

        if (questionIndex != 5) {
            res.render('numberquiz', {
                sequence: questions[questionIndex],
                correctAnswers: req.session.correctAnswers
            });
        } else {

            res.setHeader("Content-Type", "text/html");
            res.render('result', {
                sequence: questionIndex,
                correctAnswers: req.session.correctAnswers
            });
        }
    }
});

app.listen(8080);