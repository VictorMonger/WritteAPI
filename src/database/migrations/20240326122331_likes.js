/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("likes", function(table) {
    table.uuid("userId").references("users.id").onDelete("CASCADE");
    table.uuid("postId").references("posts.id").onDelete("CASCADE");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    
    table.primary(["userId", "postId"]);

    table.index(["userId", "postId"]);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('likes');
};
