/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})
Route.group(() => {
  Route.post('/register', 'AuthController.register')
  Route.post('/login', 'AuthController.login')
  Route.post('/logout', 'AuthController.logout').middleware('auth:api')
}).prefix('api/auth')

Route
  .group(() => {
    Route.get('/articles', 'ArticlesController.index')
    Route.post('/articles', 'ArticlesController.create')
    Route.get('/articles/:id', 'ArticlesController.show')
    Route.patch('/articles/:id', 'ArticlesController.update')
    Route.delete('/articles/:id', 'ArticlesController.delete')

    Route.get('/categories', 'CategoriesController.index')
    Route.post('/categories', 'CategoriesController.create')
    Route.get('/categories/:id', 'CategoriesController.show')
    Route.patch('/categories/:id', 'CategoriesController.update')
    Route.delete('/categories/:id', 'CategoriesController.delete')
  })
  .prefix('/api')
  .middleware('auth:api')
