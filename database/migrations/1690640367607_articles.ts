import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'articles'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('title')
      table.string('body')
      table
        .integer('category_id') // Add the 'category_id' column of type integer
        .unsigned() // Assuming it's an unsigned integer
        .references('id') // References the 'id' column in the 'categories' table
        .inTable('categories') // Specifies the referenced table
        .onDelete('CASCADE')
        .onUpdate('RESTRICT');

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
