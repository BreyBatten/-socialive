require("dotenv").config();

const Event = require("../models/events");
const express = require("express");
const router = express();
router.use(express.json());

// GET Event table
router.get("/", async (req, res) => {
    const { id } = req.params;
	try {
		const events = await Event.find(id);
		res.status(200).json(events);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// GET Event table with ID
router.get("/:id", async (req, res) => {
	const { id } = req.params;
	try {
		const event = await Event.findById(id);

		if (!event) {
			return res.status(404).json({
                error: `No event exists with id ${id}`
            });
		} else {
			res.status(200).json(event);
		}
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

//POST to Event table
router.post("/", async (req, res) => {
	const event = req.body;
	if (Object.entries(event).length === 0 || !event.name || !event.type) {
        return res.status(400).json({
            error: "Missing one or more required properties: name, or type"
        });
    }
    try {
        const newEvent = await Event.add(event);
        res.status(201).json(newEvent);
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});

// DEL request to with ID
router.delete("/:id", async (req, res) => {
	const { id } = req.params;

	try {
		const deleted = await Event.remove(id);

		if (deleted) {
			res.json({ removed: deleted });
		} else {
			res.status(404).json({ message: "could not find event with given id" });
		}
	} catch (err) {
		res.status(500).json({ message: "failed to delete event" });
	}
});

// EDIT Event with ID
router.put("/:id", async (req, res) => {
	const { id } = req.params;
	const changes = req.body;

	try {
		const event = await Event.findById(id);

		if (event) {
			const updatedEvent = await Event.update(changes, id);

			res.json(updatedEvent);
		} else {
			res.status(404).json({ message: "could not find event with given id" });
		}
	} catch (err) {
		res.status(500).json({ message: "Failed to update event" });
	}
});

module.exports = router;