const express = require('express');
const { mongooseConnection } = require('./models');
const jwt = require('jsonwebtoken');
const todoRouter = require('./routes/todo.routes');
const postRouter = require('./routes/post.routes');
const userRouter = require('./routes/user.routes');

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

app.post('/user', async (req, res) => {
    const { name, username, email, password } = req.body;
    const user = new User({ name, username, email, password });
    await user.save();
    res.send('User created successfully');
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) {
        return res.status(401).send('Invalid email or password');
    }
    const token = jwt.sign({ userId: user._id }, 'secret');
    res.send({ token });
});

app.use('/todo', todoRouter);
app.use('/post', postRouter);
app.use('/user', userRouter);

app.all('*', (req, res) => {
    res.status(404).send('Route not found');
});

module.exports = app;