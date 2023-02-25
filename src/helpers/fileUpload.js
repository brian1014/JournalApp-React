export const fileUpload = async (file) => {

  // if (!file) throw new Error('No tenemos ningun archivo a subir')
  if (!file) return null

  const cloudURL = 'https://api.cloudinary.com/v1_1/dkwexsfcu/upload'

  const formData = new FormData()
  formData.append('upload_preset', 'react-journal')
  formData.append('file', file)

  try {
    const resp = await fetch(cloudURL, {
      method: 'POST',
      body: formData
    })

    if(!resp.ok) throw new Error('No se pudo subir la imagen')
    const { secure_url } = await resp.json()

    return secure_url
  } catch (error) {
    return null
    // console.log(error)
    // throw new Error(error.message)
  }
}