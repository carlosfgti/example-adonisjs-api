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

    async show ({ params }) {
        const category = await Category.findOrFail(params.id)

        return category
    }

}

module.exports = CategoryController
