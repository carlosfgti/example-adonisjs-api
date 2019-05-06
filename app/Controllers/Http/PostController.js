'use strict'

const Post = use('App/Models/Post')
const { createSlug } = use('App/Helpers/helpers')

class PostController {
    async index () {
        const posts = await Post.all()

        return posts
    }

    async store ({ request }) {
        const data = request.only(['title', 'body', 'category_id'])
        data.flag = createSlug(data.title)

        const post = await Post.create(data)

        return post
    }

    async show ({ params }) {
        const post = await Post.findOrFail(params.id)

        return post
    }

    async update ({ params, request }) {
        const data = request.only(['title', 'body', 'category_id'])

        if (data.title) data.flag = createSlug(data.title)

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
