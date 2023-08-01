import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Database from "@ioc:Adonis/Lucid/Database";

export default class CategoriesController {

    async index({ response }) {
        const categories = await Database
        .query()
        .from('categories')
        .select('*')

        return response.status(200).json({ data: categories, message: 'Successfully fetched category' });
    }

    async create({request, response}: HttpContextContract) {

        const {name} = await request.validate({
          schema: schema.create({
            name: schema.string(),
          }),
        })

        const category = await Database.rawQuery('INSERT INTO categories (name) VALUES (?) RETURNING *', [name])
        return response.status(200).json({data: category.rows[0], message: 'Successfully created category'});
    }

    async show({ params, response }: HttpContextContract) {
        const categoryId = params.id

        const category = await Database.rawQuery('SELECT * FROM categories WHERE id = ?', [categoryId]);
        const categoryData = category.rows[0];

        if (!categoryData) return response.status(404).json({ message: 'Category Not Found' });

        return response.status(200).json({ data: categoryData, message: 'Successfully show category' });
    }


    async update({ request, params, response }: HttpContextContract) {
        const categoryId = params.id

        const {name} = await request.validate({
          schema: schema.create({
            name: schema.string(),
          }),
        })

        const category = await Database.rawQuery('UPDATE categories SET name = ? WHERE id = ? RETURNING *', [name, categoryId])
        return response.status(200).json({ data: category.rows[0], message: 'Successfully update category' });
    }

    async delete({ params, response }: HttpContextContract) {
        const categoryId = params.id

        const category = await Database.rawQuery('DELETE FROM categories WHERE id = ? RETURNING *', [categoryId])
        const categoryData = category.rows[0];

        if (!categoryData) return response.status(404).json({ message: 'Category Not Found' });

        return response.status(200).json({ data: categoryData, message: 'Successfully delete category' });
    }
}
