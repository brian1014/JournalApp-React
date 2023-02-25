export const initialState = {
    status: 'checking',
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null
}

export const authenticatedState = {
    status: 'authenticated',
    uid: '123ABC',
    email: 'demo@google.com',
    displayName: 'Demo User',
    photoURL: 'https://demo.jpg',
    errorMessage: null
}

export const notAauthenticatedState = {
    status: 'not-authenticated',
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null
}

export const demoUser = {
  uid: 'ABC123',
  email: 'demo@google.com',
  displayName: 'Demo User',
  photoURL: 'https://foto.jpg'
}