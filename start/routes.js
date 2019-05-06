'use strict'

const Route = use('Route')

Route.post('register', 'AuthController.register').as('auth.register')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route.resource('categories', 'CategoryController')
      .apiOnly()
Route.resource('posts', 'PostController')
      .apiOnly()