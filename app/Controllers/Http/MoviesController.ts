import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Movie from 'App/Models/Movie'
import Category from 'App/Models/Category'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class MoviesController {
  
  public async index({ view }: HttpContextContract) {
    const movies = await Movie.all()
    return view.render('movies/index',{ movies })
  }

  public async create({ view }: HttpContextContract) {
    return view.render('movies/create')
  }

  public async store({ request, response }: HttpContextContract) {
    
     const validationSchema = schema.create({
      title: schema.string({ trim: true }, [
        rules.maxLength(255),
      ]),
      author: schema.string({ trim: true }, [
        rules.maxLength(255),
      ]),
      description: schema.string({trim: true}),
      rating: schema.number(),
    })

    const validatedData = await request.validate({
      schema: validationSchema,
      messages: {
        'title.required': 'Enter title',
        'title.maxLength': 'Title can not exceed 255 characters',
        'author.required': 'Enter author',
        'author.maxLength': 'author can not exceed 255 characauthor',
        'description.required': "Enter description",
        'rating.required': 'Enter rating',
      },
    })
    
    const movie = await Movie.create({
      title: validatedData.title,
      description: validatedData.description,
      rating: request.input('rating'),
      author: request.input('author')
    })

    const category = await Category.first()
    await movie.related('categories').attach([category.id])

    return response.redirect().toRoute('MoviesController.index')
  }

  public async show({ params, view }: HttpContextContract) {
      const movie = await Movie.find(params.id)
      return view.render('movies/show',{ movie })
  }

  public async edit({ view, params }: HttpContextContract) {
      const movie = await Movie.find(params.id)
      return view.render('movies/edit',{ movie })

  }

  public async update({ request, response, params }: HttpContextContract) {
    
    const validationSchema = schema.create({
      title: schema.string({ trim: true }, [
        rules.maxLength(255),
      ]),
      author: schema.string({ trim: true }, [
        rules.maxLength(255),
      ]),
      description: schema.string({trim: true}),
      rating: schema.number(),
    })

    const validatedData = await request.validate({
      schema: validationSchema,
      messages: {
        'title.required': 'Enter title',
        'title.maxLength': 'Title can not exceed 255 characters',
        'author.required': 'Enter author',
        'author.maxLength': 'author can not exceed 255 characauthor',
        'description.required': "Enter description",
        'rating.required': 'Enter rating',
      },
    })

    var movie = await Movie.find(params.id)
    movie.title = request.input('title')
    movie.description = request.input('description')
    movie.rating = request.input('rating')
    movie.author = request.input('author')

    movie.save()
    return response.redirect().toRoute('MoviesController.show',  { id: movie.id })
  }

  public async destroy({ params, response }: HttpContextContract) {
    const movie = await Movie.find(params.id)
    await movie.related('categories').detach()
    movie.delete()
    return response.redirect().toRoute('MoviesController.index')
  }
}
