'use strict'

const Post = use('App/Models/Post')
const Category = use('App/Models/Category')
const { createSlug } = use('App/Helpers/helpers')

class PostController {
    async index () {
        const posts = await Post.all()

        return posts
    }

    async store ({ request, response }) {
        const data = request.only(['title', 'body'])
        data.flag = createSlug(data.title)

        const category = await Category.find(request.input('category'))
        if (!category) {
            return response.status(404).json({error: 'Category not found'})
        }
        data.category_id = category.id

        const post = await Post.create(data)

        return post
    }

    async show ({ params }) {
        const post = await Post.findOrFail(params.id)

        return post
    }

    async update ({ params, request, response }) {
        const data = request.only(['title', 'body'])

        if (data.title) data.flag = createSlug(data.title)

        const category = await Category.find(request.input('category'))
        if (!category) {
            return response.status(404).json({error: 'Category not found'})
        }
        data.category_id = category.id

        const post = await Post.findOrFail(params.id)
        post.merge(data)
        await post.save()

        return post
    }

    async destroy ({ params }) {
        const post = await Post.findOrFail(params.id)

        await post.delete()
    }
}

module.exports = PostController
