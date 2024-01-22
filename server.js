const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');

const app = express();
app.engine('.hbs', hbs()); // mówi jaki engine ma wykorzystać, tutaj hbs
app.set('view engine', '.hbs'); // mówi expresowi, że dostanie pliki .hbs i ma je kompilować z całością

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res, next)=> {
    res.show = (name) => {
        res.sendFile(path.join(__dirname, `/views/${name}`));
    } 
    next();
});

app.use('/user', (req, res, next) => {
    res.send('Tutaj tylko userzy zalogowani!');
    next();
});

app.get('/error.jpg', (req, res) => {
    res.sendFile(path.join(__dirname, '/error.jpg'));
});

app.get('/' || '/home', (req, res) => {
    res.render('index');
});

app.get('/about', (req, res) => {
    res.render('about', {layout: 'dark'});
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.get('/info', (req, res) => {
    res.render('info');
});

app.get('/history', (req, res) => {
    res.render('history');
});

app.get('/hello/:name', (req, res) => {
    res.send(`Hello ${req.params.name}`);
});

app.get('/hello/:name', (req, res) => {
    res.render('hello', { name: req.params.name});
});

app.post('/contact/send-message', (req, res) => {
    const { author, sender, title, message } = req.body; 

    if(author && sender && title && message) {
        res.render('contact', { isSent: true});
    }
    else {
        res.render('contact', { isError: true});
    }
});

app.use((req, res) => {
    res.status(404).show('404.html');
});

app.listen(8000, () => {
    console.log('Server is running on port 8000');
});

