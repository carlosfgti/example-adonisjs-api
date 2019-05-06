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
            .validator(new Map([
                  [['categories.store', 'categories.update'], ['StoreUpdateCategory']]
            ]))
      Route.resource('posts', 'PostController')
            .apiOnly()
            .validator(new Map([
                  [['posts.store', 'posts.update'], ['StoreUpdatePost']]
            ]))
}).middleware(['auth'])