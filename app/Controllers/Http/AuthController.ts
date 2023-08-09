import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {rules, schema} from "@ioc:Adonis/Core/Validator";
import Database from "@ioc:Adonis/Lucid/Database";
import Hash from '@ioc:Adonis/Core/Hash'

export default class AuthController {
  async register({request, response}: HttpContextContract) {
    const {email, password} = await request.validate({
      schema: schema.create({
        email: schema.string([
          rules.email(),
          rules.unique({ table: 'user', column: 'email' }),
        ]),
        password: schema.string(),
      })
    })
    const hashedPassword = await Hash.make(password);
    const user = await Database.table('user').returning(['id', 'email']).insert({
      email,
      password: hashedPassword,
      created_at: new Date(),
      updated_at: new Date()
    })

    return response.status(200).json({data: user, message: 'Successfully created user'});
  }
  async login({auth, request, response}: HttpContextContract) {

    const {email, password} = await request.validate({
      schema: schema.create({
        email: schema.string([
          rules.email(),
        ]),
        password: schema.string(),
      }),
    })

    const user = await Database.from('user').where('email', email).firstOrFail()

    if (!(await Hash.verify(user.password, password))) return response.unauthorized()

    const token = await auth.use('api').generate(user)

    return response.status(200).json({data: token, message: 'Successfully login'});
  }

  async logout({ auth, response }: HttpContextContract) {
    const user = auth.use('api').user!

    auth.use('api').revoke()

    return response.status(200).json({data: user, message: 'Successfully logout'});
  }

}
