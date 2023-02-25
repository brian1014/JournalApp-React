import {v2 as cloudinary} from 'cloudinary'
import { fileUpload } from '../../src/helpers'

cloudinary.config({
  cloud_name: 'dkwexsfcu',
  api_key: '268576454152458',
  api_secret: 'r4MIK1Bki8vcWzzLvtDi_DvQbXE',
  secure: true
})

describe('Pruebas en el helper fileUpload', () => {
  test('should de subir el archivo correctamente a Cloudinary', async () => {

    const imgUrl = 'https://th.bing.com/th/id/R.2eff3e10bdf2718330c91809b62303cf?rik=VGvlD6dwie0muw&riu=http%3a%2f%2f2.bp.blogspot.com%2f-cQNweaT58Fg%2fToWJcHPFgeI%2fAAAAAAAAAj8%2f3cPL82jw7tU%2fs640%2flandscape_ghwxt.jpg&ehk=vT0kWoKI8vt2tWQx6ppzihufFwTdmBCGiqNcyCEVDQY%3d&risl=&pid=ImgRaw&r=0'

    const resp = await fetch(imgUrl)
    const blob = await resp.blob()
    const file = new File([blob], 'foto.jpg')

    const url = await fileUpload(file)

    expect(typeof url).toBe('string')
    
    const segments = url.split('/')
    const imageId = segments[segments.length - 1].replace('.jpg', '')

    await cloudinary.api.delete_resources(['journal/' + imageId], {
      resource_type: 'image'
    })
  })

  test('should de retornar null', async () => {
    const file = new File([], 'foto.jpg')

    const url = await fileUpload(file)

    expect(url).toBe(null)
  })
})