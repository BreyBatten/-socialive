
exports.seed = function(knex) {
  return knex("user_events").insert([
    {
      user_id: 1,
      event_id: 1,
      interested_in: true,
      going_to: false
    },
    {
      user_id: 2,
      event_id: 2,
      interested_in: true,
      going_to: true
    },
    {
      user_id: 3,
      event_id: 3,
      interested_in: false,
      going_to: false
    }
  ]);
};
