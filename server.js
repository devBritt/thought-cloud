const express = require('express');
const mongoose = require('mongoose');

// initialize express
const app = express();
// retrieve port num
const PORT = process.env.PORT || 3001;

// express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(require('./routes'));

// connect mongoose to db
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/thought-cloud', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// log mongo queries being executed
mongoose.set('debug', true);

// start server
app.listen(PORT, () => console.log(`Server is now connected on port ${PORT} 🚀`));
