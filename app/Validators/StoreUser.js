'use strict'

const { formatters } = use('Validator')

class StoreUser {
  get rules () {
    return {
      username: 'required|min:5|max:80|unique:users',
      email: 'required|email|min:5|max:254|unique:users',
      password: 'required|min:6|max:20',
    }
  }

  get formatter () {
    return formatters.JsonApi
  }

  async fails (errorMessages) {
    return this.ctx.response.status(403).send(errorMessages)
  }
}

module.exports = StoreUser
