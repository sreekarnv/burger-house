const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan')
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const burgerRouter = require('./routes/burgerRoutes');
const userRouter = require('./routes/userRoutes');
const IngredientRoutes = require('./routes/ingredientRoutes');
const orderRoutes = require('./routes/orderRoutes');

const globalErrorHandler = require('./errors/globalErrorHandler');

// GLOBAL MIDDLEWARES 


// development logger
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(cors());

// setting https headers
app.use(helmet());
app.use(cookieParser())

// app.use((req, res, next) => {
//     // console.log(req.cookies)
//     next();
// })

// Limiting the no. of requests
const limiter = rateLimit({
    max: 1000,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests fromt this IP, please try again in an hour'
})

app.use('/api', limiter);

// storing data from body to req.body
app.use(express.json());



app.use('/uploads/burgers', express.static(path.join('uploads', 'burgers')))
app.use('/uploads/ingredients', express.static(path.join('uploads', 'ingredients')))
app.use('/uploads/users', express.static(path.join('uploads', 'users')))
app.use('/', express.static(path.join(__dirname, 'public')))


// cleaning malicious Data against NoSQL query injections
app.use(mongoSanitize());

// cleaning malicious Data aganinst XSS
app.use(xss());


app.use(compression());

// ROUTES
app.use('/api/v1/burgers', burgerRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/ingredients', IngredientRoutes);
app.use('/api/v1/orders', orderRoutes);

app.use((req, res, next) => {
    res.sendFile(path.resolve(__dirname, 'public/index.html'));
});

// GLOBAL ERROR HANDLER
app.use(globalErrorHandler);

module.exports = app;