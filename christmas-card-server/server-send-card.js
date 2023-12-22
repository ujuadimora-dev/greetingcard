const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const jsonp = require('express-jsonp');

const app = express();
const port = process.env.PORT || 3000;

// Apply CORS middleware before defining routes
app.use(cors({ origin: '*' }));

// Apply JSONP middleware
app.use(jsonp());

// Serve static files from the '/workspace/greetingcard/assets' directory
app.use('/assets', express.static('/workspace/greetingcard/assets'));

// Parse URL-encoded and JSON request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Handle the POST request for '/sendCard'
app.post('/sendCard', (req, res) => {
    const message = req.body.message;
    const recipientEmail = 'ujuadimora14@gmail.com'; // Replace with the recipient's email address

    console.log('Received request for:', req.url);

    // Generate the card HTML
    const cardHtml = `<img src='http://localhost:${port}/assets/images/backgrod.jpg' alt='Christmas Card Image' style='width: 300px;'><p>${message}</p>`;

    // Send the card via email
    sendCardByEmail(recipientEmail, cardHtml)
        .then(() => {
            console.log('Card sent successfully');
            res.status(200).jsonp({ message: 'Card sent successfully' });
        })
        .catch((error) => {
            console.error('Error sending card:', error);
            res.status(500).jsonp({ message: 'Error sending card' });
        });
});

// Function to send the card via email
function sendCardByEmail(recipientEmail, cardHtml) {
    return new Promise((resolve, reject) => {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'adimorauju@gmail.com', // Replace with your email address
                pass: 'stevieuju1234' // Replace with your email password
            }
        });

        const mailOptions = {
            from: 'adimorauju@gmail.com', // Replace with your email address
            to: recipientEmail,
            subject: 'Christmas E-card',
            html: cardHtml
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        });
    });
}

app.listen(port, () => {
    console.log(`Server for sending cards is running on http://localhost:${port}`);
});
