
exports.seed = function(knex) {
  return knex("comments").insert([
    {
      comment: "Oregon better win this game!",
      user_id: 1,
      event_id: 1 
    },
    {
      comment: "Marky Mark is back!!!",
      user_id: 2,
      event_id: 2 
    },
    {
      comment: "This will never be as good as Heath Ledger in The Dark Knight..",
      user_id: 3,
      event_id: 3
    }
  ]);
};
