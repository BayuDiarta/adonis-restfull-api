import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import {schema, rules} from "@ioc:Adonis/Core/Validator";

export default class ArticlesController {
    async index({response}) {
        const articles = await Database
        .from('categories')
        .join('articles', 'categories.id', '=', 'articles.category_id')
        .select('articles.*')
        .select('categories.name')

        return response.status(201).json({ data: articles, message: 'Successfully fetch article' });
    }

    async create({request, response}: HttpContextContract) {

      const {title, body, category_id} = await request.validate({
        schema: schema.create({
          title: schema.string(),
          body: schema.string(),
          category_id: schema.number([
            rules.exists({table: 'categories', column: 'id'})
          ])
        }),
      })

      const article = await Database.table('articles').returning('id').insert({title, body, category_id});
      return response.status(200).json({data: article[0].id, message: 'Successfully created article'});

    }

    async show({ params, response }: HttpContextContract) {
        const articlesId = params.id
        const article = await Database.from('articles').where('id', articlesId).first()

        if (!article) return response.status(404).json({ message: 'Article not found' });

        return response.status(200).json({ data: article, message: 'Successfully show article' });

    }

    async update({ request, params, response }: HttpContextContract) {
        const articleId = params.id

        const article = await Database.from('articles').where('id', articleId).firstOrFail()

        if (!article) return response.status(404).json({ message: 'Article not found' });

        const {title, body, category_id} = await request.validate({
          schema: schema.create({
            title: schema.string(),
            body: schema.string(),
            category_id: schema.number([
              rules.exists({table: 'categories', column: 'id'})
            ])
          }),
        })

        const articleUpdate = await Database.from('articles').where('id', articleId).update({ title, body, category_id })
        return response.status(200).json({data: articleUpdate, message: 'Successfully updated article'})
    }

    async delete({ params, response }: HttpContextContract) {
        const articleId = params.id
        const article =  await Database.from('articles').where('id', articleId).delete()
        return response.status(200).json({data: article, message: 'Successfully deleted article'})
    }
}
