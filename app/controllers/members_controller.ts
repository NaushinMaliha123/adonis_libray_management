import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { signupValidator } from '#validators/user'

export default class MembersController {
  // Show form
  public async create({ view }: HttpContext) {
    return view.render('register')
  }

  // Handle form submit
  public async store({ request, response, auth }: HttpContext) {
    const payload = await request.validateUsing(signupValidator)
    const user = await User.create(payload)

    await auth.use('web').login(user)
    return response.redirect('/')
  }
}
