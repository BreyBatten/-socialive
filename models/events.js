const db = require("../database/config");

module.exports = {
	add,
	find,
	findBy,
	findById,
	remove,
	update,
};

function find() {
	return db("events").select("id", "name", "type");
}

function findBy(filter) {
	return db("events").where(filter);
}

async function add(event) {
	const [id] = await db("events")
		.insert(event)
		.returning("id");

	return findById(id);
}

function findById(id) {
	return db("events")
		.select("id", "name", "type")
		.where({ id })
		.first();
}

async function remove(id) {
	try {
		deletedEvent = await findById(id);
		const getEvent = await db("events")
			.where({ id })
			.del();
		return getEvent ? getEvent : null;
	} catch {
		throw new Error(err);
	}
}

async function update(event, id) {
	try {
		const updateEvent = await db("events")
			.where({ id })
			.update(event);
		return updateEvent;
	} catch (err) {
		throw new Error(err);
	}
}