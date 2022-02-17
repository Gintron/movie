import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class MovieCategories extends BaseSchema {
  protected tableName = 'category_movie'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('movie_id').unsigned().references('movies.id')
      table.integer('category_id').unsigned().references('categories.id')
      table.unique(['movie_id', 'category_id'])
      table.timestamps(true, true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
