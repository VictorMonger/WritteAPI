/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("users", (table) => {
    table.string("userName").primary();
    table.string("firstName").notNullable();
    table.string("lastName").notNullable();
    table.string("email").notNullable();
    table.string("password").checkLength(">=", 8);

    table.unique(["userName"], {indexName: 'userName_unique', useConstraint: true})
    table.unique(["email"], {indexName: 'email_unique', useConstraint: true})
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("users");
};