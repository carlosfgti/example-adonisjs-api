'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Post extends Model {

    category () {
        return this.belongsTo('App/Models/Category')
    }

    author () {
        return this.belongsTo('App/Models/User')
    }

}

module.exports = Post
