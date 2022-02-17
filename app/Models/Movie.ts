import { DateTime } from 'luxon'
import { BaseModel, column, beforeCreate, manyToMany, ManyToMany, } from '@ioc:Adonis/Lucid/Orm'
import Category from 'App/Models/Category'
export default class Movie extends BaseModel {
  
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column()
  public description: text

  @column()
  public author: string

  @column()
  public rating: float

  @column()
  public slug: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async createSlug (movie: Movie) {
    movie.slug = await 'movies-' +  Math.floor(Math.random() * (99999)) + '-' +  Math.floor(Math.random() * (99999))
  }
  
  @manyToMany(() => Category)
  public categories: ManyToMany<typeof Category>

}
