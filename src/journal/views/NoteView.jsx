import { useEffect, useMemo, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DeleteOutlined, SaveOutlined, UploadOutlined } from '@mui/icons-material'
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css'
import { useForm } from '../../hooks/useForm'
import { setActiveNote, startDeletingNote, startSaveNote, startUploadingFiles } from '../../store/journal'
import { ImageGallery } from '../components'

export const NoteView = () => {

  const { active: note, messageSaved, isSaving } = useSelector(state => state.journal)
  const dispatch = useDispatch()

  const { body, title, date, onInputChange, formState } = useForm(note)

  const dateString = useMemo(() => {
    const newDate = new Date(date).toUTCString()
    return newDate
  }, [date])

  const fileInputRef = useRef()

  useEffect(() => {
    dispatch(setActiveNote(formState))
  }, [formState])

  useEffect(() => {
    if (messageSaved.length > 0) {
      Swal.fire('Nota actualizada', messageSaved, 'success')
    }
  }, [messageSaved])
  

  const onSaveNote = () => {
    dispatch(startSaveNote())
  }

  const onFileInputChange = ({target}) => {
    if (target.files === 0) return
    
    dispatch(startUploadingFiles(target.files))
  }

  const onDelete = () => {
    dispatch(startDeletingNote())
  }
  
  return (
    <Grid container 
      className='animate__animated animate__fadeIn animate__faster'
      direction='row' 
      justifyContent={'space-between'} 
      alignItems='center' 
      sx={{mt:1}}
    >
      <Grid item>
        <Typography fontSize={39} fontWeight='light'>{dateString}</Typography>
      </Grid>
      
      <Grid item>
        <input 
          type="file" 
          multiple
          ref={fileInputRef}
          onChange={onFileInputChange}
          style={{display: 'none'}}
        />
        <IconButton 
          color='primary'
          disabled={isSaving}
          onClick={() => fileInputRef.current.click()}
        >
          <UploadOutlined />
        </IconButton>
        <Button
          disabled={isSaving}
          color='primary' 
          sx={{padding: 2}}
          onClick={onSaveNote}  
        >
          <SaveOutlined sx={{fontSize: 30, mr: 1}} />
          Guardar
        </Button>
      </Grid>

      <Grid container>
       <TextField
          type='text'
          variant='filled'
          fullWidth
          multiline
          placeholder='Ingrese un t??tulo'
          label='Titulo'
          sx={{border: 'none', mb: 1}}
          name='title'
          value={title}
          onChange={onInputChange}
       /> 
       <TextField
          type='text'
          variant='filled'
          fullWidth
          multiline
          placeholder='??Qu?? sucedio en el d??a de hoy?'
          minRows={5}
          name='body'
          value={body}
          onChange={onInputChange}
       /> 
      </Grid>

      <Grid container
        justifyContent={'end'}
      >
        <Button
          onClick={onDelete}
          sx={{mt: 2}}
          color='error'
        >
          <DeleteOutlined />
        </Button>
      </Grid>

      {/* Galeria de imagenes */}
      <ImageGallery images={note.imageUrls} />
    </Grid>
  )
}
