/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("followers", function(table) {
    table.uuid("followerId").notNullable().references("users.id").onDelete("CASCADE");
    table.uuid("followedId").notNullable().references("users.id").onDelete("CASCADE");
    table.primary(["followerId", "followedId"]);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("followers");
};
