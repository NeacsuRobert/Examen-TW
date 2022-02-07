const Book = require('../models/Book')


const router = require("express").Router();

router.route("/shelves/:shelfId/books")
    .get(async (req, res) => {
        try {
            const books = await Book.findAll({
                where: { VirtualShelfId: req.params.shelfId }
            });
            if (books) {
                return res.status(200).json(books)
            } else {
                return res.status(404).json({ error: 'No books found!' })
            }
        }
        catch (err) {
            res.status(500).json({ error: "Server error!" });
        }
    })
    .post(async (req, res) => {
        try {
            if (req.body.title.length < 5 || (req.body.genre != 'DRAMA' && req.body.genre != 'COMEDY' && req.body.genre != 'TRAGEDY') || !req.body.url) {
                return res.status(400).json({ error: "Invalid parameters!" });
            } else {
                const book = await Book.create(req.body);
                book.VirtualShelfId = req.params.shelfId;
                await book.save();
                return res.status(200).json(book);
            }
        }
        catch (err) {
            res.status(500).json({ error: "Server error!" });
        }
    })

router.route("/books")
    .get(async (req, res) => {
        try {
            const books = await Book.findAll();
            res.status(200).json(books)
        }
        catch (err) {
            res.status(500).json({error: "Server error!"})
        }
})

router.route("/books/:bookId")
    .get(async (req, res) => {
        try {
            const book = await Book.findByPk(req.params.bookId);
            if (book) {
                return res.status(200).json(book)
            }
            else {
                return res.status(404).json({ error: "Book not found!" });
            }
        }
        catch (err) {
            res.status(500).json({ error: "Server error!" });
        }
    })
    .put(async (req, res) => {
        try {
            const book = await Book.findByPk(req.params.bookId);
            if (book) {
                if (!req.body.title && !req.body.genre && !req.body.url) {
                    return res.status(400).json({ error: "No parameters provided!" })
                } else {
                    if (req.body.title.length > 4) {
                        book.title = req.body.title;
                    }
                    if (req.body.genre == 'DRAMA' || req.body.genre === 'COMEDY' || req.body.genre == 'TRAGEDY') {
                        book.genre = req.body.genre;
                    }
                    if(req.body.url) {
                        book.url = req.body.url;
                    }
                    await book.save();
                    return res.status(200).json(book)
                }
            }
            else {
                return res.status(404).json({ error: "Book not found!" });
            }

        }
        catch (err) {
            res.status(500).json({ error: "Server error!" });
        }
    })
    .delete(async (req, res) => {
        try {
            const book = await Book.findByPk(req.params.bookId);
            if (book) {
                book.destroy();
                return res.status(200).json({ message: "The book has been removed from DB" })
            } else {
                return res.status(404).json({ error: "Book not found!" });
            }
        }
        catch (err) {
            res.status(500).json({ error: "Server error!" });
        }
    })
module.exports = router;