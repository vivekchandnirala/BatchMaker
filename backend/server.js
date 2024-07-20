const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./connect');
const person = require('./model');
const dotenv = require('dotenv');

dotenv.config();

const connectionString = process.env.MONGODB_URI;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '../public')));

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Set the directory where your view files are located
app.set('views', path.join(__dirname, 'views'));

// Route to serve index.html
app.get('/', (req, res) => {
    res.render();
});

// Route to serve the register page
app.get('/register', (req, res) => {
    res.render('register');
});

app.post('/submit', async (req, res) => {
    try {
        await person.create(req.body);
        res.redirect('/');
    } catch (err) {
        console.log(err);
        res.send("<h1>fill all data</h1>");
    }
});

const PORT = process.env.PORT || 3000;
const start = async () => {
    try {
        await connectDB(connectionString).then(() => {
            console.log('Connected To Db.');
        });
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
}
start();
