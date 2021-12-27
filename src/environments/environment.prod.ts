import { AuthMode } from 'src/app/auth/auth.enum'

export const environment = {
  production: true,
  authMode: AuthMode.CustomServer,
  baseUrl: 'http://localhost:3000',
}
