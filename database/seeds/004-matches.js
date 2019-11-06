
exports.seed = function(knex) {
  return knex("matches").insert([
    {
      user_one_id: 1,
      user_two_id: 2
    },
    {
      user_one_id: 2,
      user_two_id: 3
    },
    {
      user_one_id: 1,
      user_two_id: 3
    }
  ]);
};
