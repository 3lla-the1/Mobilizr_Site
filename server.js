const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 8081;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Fake "database" (store emails in an array for now)
const emailList = [];

// Handle email submissions
app.post("/subscribe", (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: "Email is required!" });
    }

    // Check if email already exists
    if (emailList.includes(email)) {
        return res.status(200).json({ message: "You're already subscribed!" }); 
    }

    // Save email if it's new
    emailList.push(email);
    console.log("New subscriber:", email);

    return res.status(200).json({ message: "You're in! Welcome aboard. 🚀" });
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
