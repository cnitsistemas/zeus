"use client"

import { useField } from 'formik'
import { ChangeEvent, useState } from 'react'
import { Button, Grid, Stack, LinearProgress } from '@mui/material'

export const InputFile = ({ ...props }) => {
  const [field] = useField(props.name)
  const [currentFile, setCurrentFile] = useState<File>()

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target
    const selectedFiles = files as FileList
    setCurrentFile(selectedFiles?.[0])
  }

  return (
    <Grid item>
      <label htmlFor={props.name}>
        {!currentFile ? (
          <Button variant='contained' color='secondary' component='span'>
            { props.label }
          </Button>
            ) : (
            <Stack sx={{ width: '60%', marginTop: '10px' }}>
              <LinearProgress color="secondary" />
            </Stack>
            )
        }
          <input
            hidden
            {...field}
            {...props}
            type='file'
            accept='image/*'
            id={props.name}
            onChange={handleFileUpload}
          />
      </label>
    </Grid>
  )
}