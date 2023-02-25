import { loginWithEmailPassword, logoutFirebase, signInWithGoogle } from '../../../src/firebase/providers'
import { checkingCredentials, login, logout } from '../../../src/store/auth'
import { checkingAuthetication, startGoogleSignIn, startLogginWithEmailPassword, startLogout } from '../../../src/store/auth/thunksAuth'
import { clearNotesLogout } from '../../../src/store/journal'
import { demoUser } from '../../fixtures/authFixtures'

jest.mock('../../../src/firebase/providers')

describe('Pruebas en thunksAuth', () => {
  
  const dispatch = jest.fn()
  beforeEach(() => jest.clearAllMocks())

  test('should de invocar el checkingCredentials', async() => {
    
    await checkingAuthetication()(dispatch)
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
  })

  test('startGoogleSignIn debe de llamar checkingCredentials y login', async() => {

    const loginData = {ok: true, ...demoUser}
    await signInWithGoogle.mockResolvedValue(loginData)

    await startGoogleSignIn()(dispatch)
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
    expect(dispatch).toHaveBeenCalledWith(login(loginData))
    
  })

  test('startGoogleSignIn debe de llamar checkingCredentials y logout - Error', async() => {
    const loginData = {ok: false, errorMessage: 'Un error en Google'}

    await signInWithGoogle.mockResolvedValue(loginData)
    await startGoogleSignIn()(dispatch)

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
    expect(dispatch).toHaveBeenCalledWith(logout(loginData.errorMessage))
  })

  test('startLogginWithEmailPassword debe de llamar checkingCredentials y login - Exito', async() => {
    
    const logginData = {ok: true, ...demoUser}
    const formData = {email: demoUser.email, password: '123456'}

    await loginWithEmailPassword.mockResolvedValue(logginData)

    await startLogginWithEmailPassword(formData)(dispatch)

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
    expect(dispatch).toHaveBeenCalledWith(login(logginData))
  })

  test('startLogout debe de llamar logoutFirebase clearNote y logout', async() => {
    await startLogout()(dispatch)

    expect(logoutFirebase).toHaveBeenCalled()
    expect(dispatch).toHaveBeenCalledWith(clearNotesLogout())
    expect(dispatch).toHaveBeenCalledWith(logout())

  })
})