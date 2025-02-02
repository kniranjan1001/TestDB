// Import required modules
require('dotenv').config(); // Load environment variables
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000; // Use environment variable or default to 3000

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Get MongoDB URI from environment variables
const MONGO_URI ='mongodb+srv://cecir57193:CEdMToCzySOTMeBq@cluster0.uqzbu.mongodb.net/' ;

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
});

// Define a Mongoose schema and model
const stringSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const StringModel = mongoose.model('String', stringSchema);

// POST API to save a string
app.post('/save-string', async (req, res) => {
    try {
        const { text } = req.body;

        if (!text || typeof text !== 'string') {
            return res.status(400).json({ message: 'Invalid input. Please provide a valid string.' });
        }

        const newString = new StringModel({ text });
        await newString.save();

        res.status(201).json({ message: 'String saved successfully!', data: newString });
    } catch (error) {
        console.error('Error saving string:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
