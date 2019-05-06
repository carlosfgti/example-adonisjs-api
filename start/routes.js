'use strict'

const Route = use('Route')

Route.post('/register', 'AuthController.register').as('auth.register')
Route.post('/login', 'AuthController.login').as('auth.login')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route.group(() => {
      Route.resource('categories', 'CategoryController')
            .apiOnly()
      Route.resource('posts', 'PostController')
            .apiOnly()
}).middleware(['auth'])