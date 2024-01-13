const express = require('express');
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const routes = require('./routes');
const {authentication} = require('./middleware/authMiddleware');
const port = 3000;
const app = express();

app.engine('hbs', handlebars.engine({
    extname: 'hbs',
}));
app.set('view engine', 'hbs');



app.use('/static', express.static('public')); // Всички статични файлове, ако са в папка static ги търси в папка public.
app.use(express.urlencoded({extended: false})); // Мидълуеър, който парсва данните от формулярите и ги слага в req.body.
app.use(cookieParser());
app.use(authentication); // Аутентикирането на юзъра трябва да е след cookie parser и преди routes.
app.use(routes);

// set strict query / deprecation warning
mongoose.set('strictQuery', false);
// TODO: Change database name according to the project
mongoose.connect('mongodb://127.0.0.1:27017/friendly-world');
console.log('Database successfully connected.');



app.listen(port, () => console.log(`Server is listening on port ${port}...`));