/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("posts", (table) => {
    table.uuid("id").defaultTo(knex.fn.uuid()).primary();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.text("content").notNullable();
    table.integer("likes").defaultTo(0);

    table.string("author");
    table.foreign("author").references("users.userName").onDelete("CASCADE");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("posts");
};