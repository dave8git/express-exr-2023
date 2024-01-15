const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next)=> {
    res.show = (name) => {
        res.sendFile(path.join(__dirname, `/views/${name}`));
    }
    next();
});

app.use('/admin', (req, res, next) => {
    res.send('Tutaj tylko admini!');
    next();
});

app.get('/error.jpg', (req, res) => {
    res.sendFile(path.join(__dirname, '/error.jpg'));
});

app.get('/' || '/home', (req, res) => {
    res.show('index.html');
});

app.get('/about', (req, res) => {
    res.show('about.html');
});

app.use((req, res) => {
    res.status(404).show('404.html');
});

app.listen(8000, () => {
    console.log('Server is running on port 8000');
});

