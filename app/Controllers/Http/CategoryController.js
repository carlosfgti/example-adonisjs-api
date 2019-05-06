'use strict'

const Category = use('App/Models/Category')

class CategoryController {

    async index () {
        const categories = await Category.all()

        return categories
    }

    async store ({ request }) {
        const data = request.only(['title', 'description'])
        data.flag = data.title

        const category = await Category.create(data)

        return category
    }

}

module.exports = CategoryController
