const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = require('./app');


const DATABASE = 'mongodb+srv://sreekarnv:<PASSWORD>@cluster0.kad9x.mongodb.net/burger-house?retryWrites=true&w=majority'

const DB = `${DATABASE}`.replace('<PASSWORD>', process.env.DATABASE_PASSWORD)

mongoose.connect(DB, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log(`Connected to ${DB} successfully`))
    .catch((err) => console.log(`Error regarding connection with database. Shutting down...`, err))


app.listen(process.env.PORT, () => {
    console.log(process.env.NODE_ENV);
    console.log(`App running on port ${process.env.PORT}`);
})