import React, { useState } from 'react';

import Button from '@mui/material/Button';
import Dialog from "@mui/material/Dialog";
import DownloadIcon from '@mui/icons-material/Download';
import CircularProgress from '@mui/material/CircularProgress';

import fileDownload from 'js-file-download';
import axios from "axios";
import PdfLoaderDialog from './pdfLoaderDialog'
import { Alert, Snackbar } from '@mui/material';


export default ({disabled=false, testId}) => {

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    var [alertOpen, setAlertOpen] = React.useState(false)

    const downloadTest = async ({version, mixExercises, mixChooseAnswers, appendWithSolved}) => {
        setAlertOpen(false)
        setLoading(true)
        const response = await axios.get (
          `/api/pdfGenerator/${testId}`, {
            responseType: 'blob',
            params: {
                version, 
                mixExercises, 
                mixChooseAnswers, 
                appendWithSolved
            },
            validateStatus: () => true,
          })
        setLoading(false)

        if(response.status === 200 && response.data.ok ) {
            fileDownload(response.data, 'test.pdf')
        } else {
            setErrorMessage("Error on geenreting test. Check exercises format")
            setAlertOpen(true)
        }
    }

    const handleOpen = () => {
        setOpen(true)
      }
    
    const handleClose = () => {
        setOpen(false)
    }

    function handleAlertClose(){
        setAlertOpen(false)
    }

    return(
        <>
            <Dialog open={open} onClose={() => handleClose()} >
                <PdfLoaderDialog 
                    onCancel={handleClose}
                    onSuccess={({version, mixExercises, mixChooseAnswers, appendWithSolved}) => {
                        downloadTest({version, mixExercises, mixChooseAnswers, appendWithSolved})
                        handleClose();
                    }}
                />



            </Dialog> 
            <Button variant="outlined" 
                    load 
                    disabled={disabled}
                    startIcon={ loading ? <CircularProgress size={"20px"}/> : <DownloadIcon /> } 
                    onClick={(e) => {
                            e.preventDefault()
                            handleOpen()
                        }
                    } 
                    
                    > 
                        Download test
            </Button>
            <Snackbar open={alertOpen} autoHideDuration={4000} onClose={handleAlertClose}>
                <Alert onClose={handleAlertClose} severity="error" sx={{ width: '100%' }}>
                    {errorMessage} 
                </Alert>
            </Snackbar>
        </> 
    )
}