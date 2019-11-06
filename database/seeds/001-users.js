
exports.seed = function(knex) {
  return knex("users").insert([
    {
      username: "breybat10",
      first_name: "Brey",
      last_name: "Batten",
      email: "bbat104@gmail.com",
      password: "password",
      gender: "male",
      gender_preference: "female"
    },
    {
      username: "johndoe69",
      first_name: "John",
      last_name: "Doe",
      email: "john@gmail.com",
      password: "password",
      gender: "male",
      gender_preference: "female"
    },
    {
      username: "jane",
      first_name: "Jane",
      last_name: "Smith",
      email: "jane@gmail.com",
      password: "password",
      gender: "female",
      gender_preference: "male"
    }
  ]);
};
