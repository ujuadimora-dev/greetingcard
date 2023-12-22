const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Enable CORS
app.use(cors());

// Serve static files from the '/workspace/greetingcard/assets' directory
app.use('/assets', express.static('/workspace/greetingcard/assets'));

// Dummy data for story generation
const stories = {
    a: {
        story: "How to write a story in 5 steps:\n1. Find inspiration\n2. Brainstorm\n3. Outline\n4. Write the first draft\n5. Revise and edit your story.",
        imageUrl: "/assets/images/gifts.png"
    },
    b: {
        story: "How to decorate a Christmas tree in 5 steps:\n1. Choose a beautiful tree\n2. String colorful lights\n3. Hang festive ornaments\n4. Add a tree topper\n5. Stand back and admire your stunning Christmas tree.",
        imageUrl: "/assets/images/star.png"
    },
    c: {
        story: "The journey of the Three Wise Men in 5 steps:\n1. Follow the guiding star from the East\n2. Bring precious gifts for the newborn King\n3. Seek guidance from locals\n4. Avoid King Herod's palace\n5. Return home with the blessings of witnessing the birth of Jesus.",
        imageUrl: "/assets/images/bell.png"
    },
};

// Route for generating a story
app.get('/api/generateStory', (req, res) => {
    const category = req.query.category;

    // Check if the category exists in the dummy data
    if (stories.hasOwnProperty(category)) {
        res.json(stories[category]);
    } else {
        res.status(404).json({ error: 'Category not found', requestedCategory: category });
    }
});


// Start the server
app.listen(port, () => {
    console.log(`Server for generating stories is running on http://localhost:${port}`);
});
