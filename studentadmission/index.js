const con = require('./connection');
const express = require('express');
const bodyParser = require('body-parser');
const router = express();
const port = 4500;

router.set('view engine', 'ejs');
router.use('/public', express.static('public'));
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

let submittedData = null;

router.post('/submit', (req, res) => {
    const { email, adhar, address, cetScore, mobile, branch } = req.body;

    const sql = `INSERT INTO applicant VALUES (?, ?, ?, ?, ?, ?)`;
    const values = [email, adhar, address, cetScore, mobile, branch || ''];

    con.query(sql, values, (err, result) => {
        if (err) {
            console.error('MySQL Error:', err);
            res.status(500).json({ error: 'Internal Server Error', details: err.message });
        } else {
            console.log('Data inserted successfully');
            submittedData = { email, adhar, address, cetScore, mobile, branch };
            res.redirect('/application');
        }
    });
});

router.get('/application', (req, res) => {
    res.render('application.ejs', { submittedData });
});

router.get('/', (req, res) => {
    res.render('reg.ejs');
});

router.get('/a', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

router.get('/applicant', (req, res) => {
    res.render('applicant.ejs');
});

router.get('/courses', (req, res) => {
    res.render('courses.ejs');
});

router.get('/payment', (req, res) => {
    res.render('payment.ejs');
});

router.get('/qr_page', (req, res) => {
    res.render('qr_page.ejs');
});

router.get('/admin_login', (req, res) => {
    res.render('admin_login.ejs');
});

router.post('/admin_login', (req, res) => {
    const enteredEmail = req.body.email;
    const enteredPassword = req.body.password;

    const query = 'SELECT * FROM admin WHERE mail = ? AND password = ?';

    con.query(query, [enteredEmail, enteredPassword], (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).send('Internal Server Error');
        }

        if (results.length > 0) {
            // return res.send('Login successful!');
            return res.redirect('/admin');
        }

        res.send('Invalid email or password');
    });
});

router.get('/admin', (req, res) => {
    const query = 'SELECT * FROM applicant';

    con.query(query, (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).send('Internal Server Error');
        }

        res.render('admin', { applicants: results });
    });
});

router.post('/admin/delete/:mail', (req, res) => {
    const mailToDelete = req.params.mail;
    const deleteQuery = 'DELETE FROM applicant WHERE mail = ?';

    con.query(deleteQuery, [mailToDelete], (err) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).send('Internal Server Error');
        }

        res.sendStatus(200); // Send a success response to the client
    });
});


// Close the database connection when the server is shutting down
process.on('SIGINT', () => {
    con.end((err) => {
        if (err) {
            console.error('Error closing database connection:', err);
        }
        process.exit();
    });
});

router.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
