import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category'
import Movie from 'App/Models/Movie'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class CategoriesController {

  public async index({ view }: HttpContextContract) {
    const categories = await Category.all()
    return view.render('categories/index', { categories })
  }

  public async create({ view }: HttpContextContract) {
     return view.render('categories/create')
  }

  public async store({ request, response }: HttpContextContract) {
    
    const validationSchema = schema.create({
      title: schema.string({ trim: true }, [
        rules.maxLength(255),
      ]),
    })

    const validatedData = await request.validate({
      schema: validationSchema,
      messages: {
        'title.required': 'Enter title',
        'title.maxLength': 'Title can not exceed 255 characters'
      },
    })

    const category = await Category.create({
      title: validatedData.title,
      is_active: request.input('is_active')
    })

    const movie = await Movie.first()
    await category.related('movies').attach([movie.id])

    return response.redirect().toRoute('CategoriesController.index')
  }

  public async show({ params, view }: HttpContextContract) {
    const category = await Category.find(params.id)
    return view.render('categories/show',{ category })
  }

  public async edit({ view, params }: HttpContextContract) {
    const category = await Category.find(params.id)
    return view.render('categories/edit', { category })
  }

  public async update({ request, response, params }: HttpContextContract) {
    const validationSchema = schema.create({
      title: schema.string({ trim: true }, [
        rules.maxLength(255),
      ]),
    })

    const validatedData = await request.validate({
      schema: validationSchema,
      messages: {
        'title.required': 'Enter title',
        'title.maxLength': 'Title can not exceed 255 characters'
      },
    })

    var category = await Category.find(params.id)

    category.title = validatedData.title
    category.is_active = request.input('is_active')

    category.save()
    return response.redirect().toRoute('CategoriesController.show',  { id: category.id })
  }
  public async destroy({ params, response }: HttpContextContract) {
    const category = await Category.find(params.id)
    await category.related('movies').detach()
    category.delete()
    return response.redirect().toRoute('CategoriesController.index')
  }
}
