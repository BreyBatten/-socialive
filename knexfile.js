require("dotenv").config();
module.exports = {
	development: {
		client: "pg",
		useNullAsDefault: true,
		connection: {
			connectionString: process.env.DB_CONNECTION_URI,
			// ssl: true,
		},
		migrations: {
			directory: "./database/migrations",
		},
		seeds: {
			directory: "./database/seeds",
		},
	},
};
