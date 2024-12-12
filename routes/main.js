const express = require("express");
const router = express.Router();

// Define our data
var shopData = { shopName: "In Tune with Music Theory" };

// Handle our routes
router.get('/', function(req, res) {
    res.render('index.ejs', shopData);
});

router.get('/about', function(req, res) {
    res.render('about.ejs', shopData);
});

router.get('/topics', (req, res) => {
    const sqlquery = "SELECT * FROM topics";
    db.query(sqlquery, (err, result) => {
        if (err) {
            res.send("Error loading topics");
        } else {
            res.render('topics.ejs', { topics: result });
        }
    });
});

router.get('/topics/:topic_name/:question_number', (req, res) => {
    const topicName = req.params.topic_name;
    const questionNumber = parseInt(req.params.question_number, 10);

    // Query to get topic ID by name
    const sqlTopic = "SELECT id FROM topics WHERE name = ?";
    db.query(sqlTopic, [topicName], (err, topicResult) => {
        if (err || topicResult.length === 0) {
            res.send("Topic not found or error loading topic."); // Handle error for topic
        }

        const topicId = topicResult[0].id;

        // Query to get the question for the topic and question number
        const sqlQuestions = "SELECT * FROM questions WHERE topic_id = ? LIMIT ?, 1";
        db.query(sqlQuestions, [topicId, questionNumber - 1], (errQuestions, questionResult) => {
            if (errQuestions || questionResult.length === 0) {
                res.send("No question found for this topic and number."); // Handle error for question
            }

            // Render the question page
            res.render('questions.ejs', {
                currentQuestion: questionResult[0],
                topicName,
                questionNumber
            });
        });
    });
});

router.post('/answer-feedback', (req, res) => {
    const { userAnswer, correctAnswer, questionId, questionNumber, topicName } = req.body;

    // Normalisation function: remove non-alphanumeric characters and lowercase the answer
    const normaliseAnswer = (answer) =>
        answer
            .toLowerCase() // Convert to lowercase
            .replace(/[^a-z0-9]/g, '');  // Remove anything that's not a letter or number

    // Normalise the answers
    const normalisedUserAnswer = normaliseAnswer(userAnswer);
    const normalisedCorrectAnswer = normaliseAnswer(correctAnswer);

    // Check if the normalised answers are equal
    const isCorrect = normalisedUserAnswer === normalisedCorrectAnswer;

    // Insert the user's answer into the database
    const sqlInsert = "INSERT INTO user_answers (user_answer, is_correct, question_id) VALUES (?, ?, ?)";
    db.query(sqlInsert, [userAnswer, isCorrect, questionId], (err) => {
        if (err) {
            console.error("Database Error:", err);
            return res.send("Error saving your answer.");
        }

        res.render('answer-feedback.ejs', {
            isCorrect,
            correctAnswer,
            userAnswer,
            questionNumber: parseInt(questionNumber, 10),
            topicName
        });
    });
});

router.get('/search', function(req, res) {
    res.render("search.ejs", shopData);
});

router.get('/search-result', function(req, res) {
    // Searching in the database
    res.send("You searched for: " + req.query.keyword);
});

router.get('/register', function(req, res) {
    res.render('register.ejs', shopData);
});

router.post('/registered', function(req, res) {
    // Saving data in database
    res.send(' Hello ' + req.body.first + ' ' + req.body.last + 
             ' you are now registered!  We will send an email to you at ' + req.body.email);
});

// Define a new route to list topics from the database
router.get('/list', function(req, res) {
    let sqlquery = "SELECT * FROM topics"; // Query database to get all the topics
    // Execute SQL query
    db.query(sqlquery, (err, result) => {
        if (err) {
            res.redirect('./');
        }
        let newData = Object.assign({}, shopData, {availableBooks:result});
          console.log(newData)
          res.render("list.ejs", newData)
    });
});

// Export the router object so index.js can access it
module.exports = router;
