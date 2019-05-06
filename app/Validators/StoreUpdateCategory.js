'use strict'

const { formatters } = use('Validator')

class StoreUpdateCategory {
  get rules () {
    return {
      title: 'required|min:3|max:150|unique:categories',
      description: 'min:3|max:255',
      category: 'required'
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
