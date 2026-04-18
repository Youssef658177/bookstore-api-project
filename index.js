const express = require('express');
const books = require('./booksdb.js');
const app = express();

app.use(express.json());

// --- المهام من 1 إلى 5 و 10 إلى 13 ---


// مهمة 1 & 10: جلب كل الكتب
app.get('/', (req, res) => {
    res.send(JSON.stringify(books, null, 4));
});

// مهمة 2 & 11: البحث بـ ISBN باستخدام Promises
app.get('/isbn/:isbn', (req, res) => {
    const isbn = req.params.isbn;
    new Promise((resolve, reject) => {
        let book = Object.values(books).find(b => b.isbn === isbn);
        if (book) resolve(book);
        else reject("Book not found");
    })
    .then(book => res.send(book))
    .catch(err => res.status(404).send(err));
});

// مهمة 3 & 12: البحث بالمؤلف باستخدام Async/Await
app.get('/author/:author', async (req, res) => {
    const author = req.params.author;
    const filteredBooks = Object.values(books).filter(b => b.author === author);
    res.send(filteredBooks);
});

// مهمة 4 & 13: البحث بالعنوان باستخدام Async/Await
app.get('/title/:title', async (req, res) => {
    const title = req.params.title;
    const filteredBooks = Object.values(books).filter(b => b.title === title);
    res.send(filteredBooks);
});

// مهمة 5: مراجعات الكتاب
app.get('/review/:isbn', (req, res) => {
    const isbn = req.params.isbn;
    const book = Object.values(books).find(b => b.isbn === isbn);
    res.send(book.reviews);
});

// --- المهام من 6 إلى 9 (المستخدمين والمراجعات) ---

let users = [];

// مهمة 6: تسجيل مستخدم
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    if (username && password) {
        users.push({username, password});
        res.status(200).json({message: "User registered successfully"});
    } else {
        res.status(400).json({message: "Invalid input"});
    }
});

// مهمة 8: إضافة مراجعة (تحتاج إرسال اسم المستخدم في الـ Query)
app.put('/auth/review/:isbn', (req, res) => {
    const isbn = req.params.isbn;
    const review = req.query.review;
    const username = req.query.username; // للتسهيل في الاختبار
    const book = Object.values(books).find(b => b.isbn === isbn);
    if (book) {
        book.reviews[username] = review;
        res.send("Review added successfully");
    }
});

// مهمة 9: حذف مراجعة
app.delete('/auth/review/:isbn', (req, res) => {
    const isbn = req.params.isbn;
    const username = req.query.username;
    const book = Object.values(books).find(b => b.isbn === isbn);
    if (book && book.reviews[username]) {
        delete book.reviews[username];
        res.send("Review deleted");
    }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
