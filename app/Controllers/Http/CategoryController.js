'use strict'

const Category = use('App/Models/Category')

class CategoryController {

    async index () {
        const categories = await Category.all()

        return categories
    }

}

module.exports = CategoryController
