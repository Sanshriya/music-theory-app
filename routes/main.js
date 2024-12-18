const express = require("express");
const router = express.Router();

// Define our data
var appData = { appName: "In Tune with Music Theory" };

// Handle our routes
router.get('/', function(req, res) {
    res.render('index.ejs', appData);
});

router.get('/about', function(req, res) {
    res.render('about.ejs', appData);
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
            res.send("Topic not found or error loading topic.");
        }

        const topicId = topicResult[0].id;

        // Query to get the question for the topic and question number
        const sqlQuestions = "SELECT * FROM questions WHERE topic_id = ? LIMIT ?, 1";
        db.query(sqlQuestions, [topicId, questionNumber - 1], (errQuestions, questionResult) => {
            if (errQuestions || questionResult.length === 0) {
                res.send("No question found for this topic and number.");
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
            .toLowerCase()
            .replace(/[^a-z0-9]/g, ''); // Remove anything that's not a letter or number

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
            res.send("Error saving your answer.");
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
    res.render("search.ejs", appData);
});

router.get('/search-result', function(req, res) {
    const keyword = req.query.keyword;
    const searchQuery = `%${keyword}%`; // Wrap the search term with '%' for LIKE search

    // Search both question and answer columns for the keyword
    const sqlQuery = `
        SELECT * FROM questions
        WHERE question LIKE ? OR answer LIKE ?`;

    db.query(sqlQuery, [searchQuery, searchQuery], (err, results) => {
        if (err) {
            console.error("Error searching questions:", err);
            res.send("Error during search.");
        }

        // Render the search results
        res.render('search-result.ejs', {
            keyword,
            results,
        });
    });
});

// Export the router object so index.js can access it
module.exports = router;
