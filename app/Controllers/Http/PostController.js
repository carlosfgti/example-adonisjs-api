'use strict'

const Post = use('App/Models/Post')
const Category = use('App/Models/Category')
const { createSlug } = use('App/Helpers/helpers')

class PostController {
    async index () {
        const posts = await Post
                                .query()
                                .with('category')
                                .with('author')
                                .fetch()

        return posts
    }

    async store ({ request, response, auth }) {
        const data = request.only(['title', 'body'])
        data.flag = createSlug(data.title)

        const category = await Category.find(request.input('category'))
        if (!category) {
            return response.status(404).json({error: 'Category not found'})
        }
        
        const post = await Post.create({
            user_id: auth.user.id,
            category_id: category.id,
            ... data
        })

        return post
    }

    async show ({ params, response }) {
        // const post = await Post.findOrFail(params.id)
        const post = await Post
                            .query()
                            .with('category')
                            .with('author')
                            .where({ id: params.id })
                            .first()

        if (!post) {
            response.status(404).json({error: 'Post not found'})
        }

        return post
    }

    async update ({ params, request, response, auth }) {
        const data = request.only(['title', 'body'])

        if (data.title) data.flag = createSlug(data.title)

        const category = await Category.find(request.input('category'))
        if (!category) {
            return response.status(404).json({error: 'Category not found'})
        }

        const post = await Post.findOrFail(params.id)
        post.merge({
            user_id: auth.user.id,
            category_id: category.id,
            ... data
        })
        await post.save()

        return post
    }

    async destroy ({ params, auth, response }) {
        const post = await Post.findOrFail(params.id)

        if (post.user_id != auth.user.id) {
            return response.status(401).json({error: 'Not authorized'})
        }

        await post.delete()
    }
}

module.exports = PostController
