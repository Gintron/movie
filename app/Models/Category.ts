import { DateTime } from 'luxon'
import { BaseModel, column, beforeCreate, manyToMany, ManyToMany, } from '@ioc:Adonis/Lucid/Orm'
import Movie from 'App/Models/Movie'

export default class Category extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column()
  public is_active: boolean

  @column()
  public slug: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async createSlug (category: Category) {
    category.slug = await 'category-' +  Math.floor(Math.random() * (99999)) + '-' +  Math.floor(Math.random() * (99999))
  }

  @manyToMany(() => Movie)
  public movies: ManyToMany<typeof Movie>
}
