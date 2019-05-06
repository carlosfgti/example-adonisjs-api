'use strict'

const { formatters } = use('Validator')

class StoreUpdatePost {
  get rules () {
    const postId = this.ctx.params.id

    return {
      title: `required|min:3|max:150|unique:posts,title,id,${postId}`,
      body: 'required|min:3|max:255',
      category: 'required',
    }
  }

  get formatter () {
    return formatters.JsonApi
  }

  async fails (errorMessages) {
    return this.ctx.response.status(403).send(errorMessages)
  }
}

module.exports = StoreUpdatePost
