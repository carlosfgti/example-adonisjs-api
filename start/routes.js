'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route.resource('categories', 'CategoryController')
      .apiOnly()
Route.resource('posts', 'PostController')
      .apiOnly()