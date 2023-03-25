const express = require('express');
const { mongooseConnection } = require('./models');
const userRoutes = require('./routes/user.routes');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    if (mongooseConnection()) {
        next();
    } else {
        res.status(500).json({
            statusCode: 500,
            status: "Mongo is unavailable"
        });
    }
});

app.get('/healthcheck', (req, res) => {
    res.send('Working');
})

app.post('/user', userRoutes.user);
app.post('/login', userRoutes.login);

app.use('todo', userRoutes.authMiddleware, );
app.use('post', userRoutes.authMiddleware, );


module.exports = app;
