
exports.up = function (knex, Promise) {
    return knex.schema.createTable('airports', table => {
        table.increments('id').primary();
        table.string('code');
        table.string('city');
        table.string('name');
        table.decimal('lat', 10, 8);
        table.decimal('lon', 11, 8);
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('airports');
};
