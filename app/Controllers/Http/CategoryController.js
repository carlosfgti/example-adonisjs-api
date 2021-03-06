'use strict'

const Category = use('App/Models/Category')
const { createSlug } = use('App/Helpers/helpers')

class CategoryController {

    async index () {
        const categories = await Category.all()

        return categories
    }

    async store ({ request }) {
        const data = request.only(['title', 'description'])
        data.flag = createSlug(data.title)

        const category = await Category.create(data)

        return category
    }

    async show ({ params, response }) {
        const category = await Category
                                    .query()
                                    .with('posts')
                                    .where({ id: params.id })
                                    .first()
        
        if (!category) {
            response.status(404).json({error: 'Category not found'})
        }

        return category
    }

    async update ({ params, request }) {
        const data = request.only(['title', 'description'])

        if (data.title) data.flag = createSlug(data.title)

        const category = await Category.findOrFail(params.id)
        category.merge(data)
        await category.save()

        return category
    }

    async destroy ({ params }) {
        const category = await Category.findOrFail(params.id)

        await category.delete()
    }

}

module.exports = CategoryController
