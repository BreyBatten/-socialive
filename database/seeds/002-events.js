
exports.seed = function(knex) {
  return knex("events").insert([
    {
      name: "Football Game",
      type: "Sporting Event",
      location: "Autzen Stadium, Eugene, Oregon",
      date: "2019-11-16 19:30:00"
    },
    {
      name: "Marky Mark and the Funcky Bunch",
      type: "Concert",
      location: "MSG",
      date: "2020-01-04 18:00:00"
    },
    {
      name: "The Joker",
      type: "Movie Premier",
      location: "Cinema",
      date: "2019-10-10 19:00:00"
    }
  ]);
};
