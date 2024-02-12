const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Set up Express app
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/nodejs_project', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Define User model
const User = mongoose.model('User', {
    name: String,
    email: String,
});

// Middleware
app.use(bodyParser.json());

// Routes
app.get('/users', async(req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/users', async(req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).send(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Start the server
const port = process.env.PORT || 3030;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});