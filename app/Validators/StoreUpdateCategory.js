'use strict'

const { formatters } = use('Validator')

class StoreUpdateCategory {
  get rules () {
    const categoryId = this.ctx.params.id

    return {
      title: `required|min:3|max:150|unique:categories,title,id,${categoryId}`,
      description: 'min:3|max:255',
    }
  }

  get formatter () {
    return formatters.JsonApi
  }

  async fails (errorMessages) {
    return this.ctx.response.status(403).send(errorMessages)
  }
}

module.exports = StoreUpdateCategory
