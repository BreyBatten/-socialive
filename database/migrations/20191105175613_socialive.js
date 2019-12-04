exports.up = function(knex) {
  return knex.schema
    .createTable("users", table => {
      table.increments();
      table
        .string("username")
        .notNullable()
        .unique();
      table.string("first_name").notNullable();
      table.string("last_name").notNullable();
      table.integer("age").notNullable();
      table
        .string("email")
        .notNullable()
        .unique();
      table.string("password").notNullable();
      table.string("gender");
      table.string("gender_preference");
      table.string("jwt", 512);
    })
    .createTable("events", table => {
      table.increments();
      table.string("name").notNullable();
      table
        .enu("type", ["Concert", "Sporting Event", "Movie Premier", "Other"])
        .notNullable();
      table.string("location");
      table.datetime("date");
    })
    .createTable("comments", table => {
      table.increments();
      table.string("comment").notNullable();
      table.integer("user_id").references("users.id");
      table.integer("event_id").references("events.id");
    })
    .createTable("matches", table => {
      table.increments();
      table.integer("user_one_id").references("users.id");
      table.integer("user_two_id").references("users.id");
    })
    .createTable("user_events", table => {
      table.increments();
      table.integer("user_id").references("users.id");
      table.integer("event_id").references("events.id");
      table.boolean("interested_in").defaultTo(false);
      table.boolean("going_to").defaultTo(false);
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("user_events")
    .dropTableIfExists("matches")
    .dropTableIfExists("comments")
    .dropTableIfExists("events")
    .dropTableIfExists("users");
};
