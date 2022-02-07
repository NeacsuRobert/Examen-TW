const VirtualShelf = require('../models/VirtualShelf')

const router = require("express").Router();

router.route("/shelves")
    .get(async (req, res) => {
        try {
            const shelves = await VirtualShelf.findAll();
            res.status(200).json(shelves)
        }
        catch (err) {
            res.status(500).json({ error: "Server error!" });
        }
    })
    .post(async (req, res) => {
        try {
            if (req.body) {
                if (req.body.description.length < 3) {
                    return res.status(400).json({ error: "Description needs to be at least 3 characters long!" });
                } else {
                    const shelf = await VirtualShelf.create(req.body);
                    return res.status(200).json(shelf);
                }
            }
            else {
                return res.status(400).json({ error: "Body cannot be empty!" });
            }
        }
        catch (err) {
            res.status(500).json({ error: "Server error!" });
        }
    })

router.route("/shelves/:shelfId")
    .get(async (req, res) => {
        try {
            const shelf = await VirtualShelf.findByPk(req.params.shelfId);
            if (shelf) {
                return res.status(200).json(shelf)
            }
            else {
                return res.status(404).json({ error: "Shelf not found!" });
            }
        }
        catch (err) {
            res.status(500).json({ error: "Server error!" });
        }
    })
    .put(async (req, res) => {
        try {
            const shelf = await VirtualShelf.findByPk(req.params.shelfId);
            if (shelf) {
                if (!req.body.description) {
                    return res.status(400).json({ error: "Parameters missing!" })
                } else {
                    shelf.description = req.body.description;
                    await shelf.save();
                    return res.status(200).json(shelf)
                }
            }
            else {
                return res.status(404).json({ error: "Shelf not found!" });
            }

        }
        catch (err) {
            res.status(500).json({ error: "Server error!" });
        }
    })
    .delete(async (req, res) => {
        try {
            const shelf = await VirtualShelf.findByPk(req.params.shelfId);
            if (shelf) {
                shelf.destroy();
                return res.status(200).json({ message: "The shelf has been deleted from DB" })
            } else {
                return res.status(404).json({ error: "Shelf not found!" });
            }
        }
        catch (err) {
            res.status(500).json({ error: "Server error!" });
        }
    })

router.route("/getShelfFilter/:description")
    .get(async (req, res) => {
        try{
            var filteredShelves = [];
            const shelves = await VirtualShelf.findAll();
            shelves.forEach(shelf => {
                if (shelf.description.includes(req.params.description)) {
                    filteredShelves.push(shelf);
                }
            })
            if (filteredShelves.length == 0) {
                res.status(404).json({ error: "No shelves found" })
            }
            else {
                return res.status(200).json(filteredShelves);
            }
        }
        catch (err) {
            res.status(500).json({error: "Server error!"})
        }
    })

router.route("/getShelvesSorted")
    .get(async (req, res) => {
        try {
            const shelves = await VirtualShelf.findAll();
            shelves.sort((a, b) => (a.description > b.description) ? 1 : ((b.description > a.description) ? -1 : 0))
            res.status(200).json(shelves);
        }
        catch (err) {
            res.status(500).json({error:"Server error!"})
        }
    })
module.exports = router;