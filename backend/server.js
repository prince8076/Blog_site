const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const postRoutes = require('./routes/posts');

const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());


mongoose.connect('mongodb+srv://rahul:1234@movie.dy4lsuv.mongodb.net/?retryWrites=true&w=majority&appName=movie', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Define a simple route
app.get('/', (req, res) => {
    res.send('Blog API is running');
});
app.use('/api', postRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
