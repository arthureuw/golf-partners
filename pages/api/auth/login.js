import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from 'lib/session'
import API from "../../../lib/api";

export default withIronSessionApiRoute(loginRoute, sessionOptions)

async function loginRoute(req, res) {

  try {
    const {
      data: { jwt, userData },
    } = await API.post(`http://localhost:1337/api/auth/local`, req.query.credentials)

    const login = { isLoggedIn: true, jwt, user: userData }
    req.session.user = login
    await req.session.save()
    res.json(login.user)
  } catch (error) {
    res.status(500).json({ message: (error).message })
  }
}
