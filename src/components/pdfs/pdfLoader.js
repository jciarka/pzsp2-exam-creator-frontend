import React, { useState } from 'react';

import Button from '@mui/material/Button';
import Dialog from "@mui/material/Dialog";
import DownloadIcon from '@mui/icons-material/Download';
import CircularProgress from '@mui/material/CircularProgress';

import fileDownload from 'js-file-download';
import axios from "axios";
import PdfLoaderDialog from './pdfLoaderDialog'

export default ({testId}) => {

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const downloadTest = async ({version, mixExercises, mixChooseAnswers, appendWithSolved}) => {
        setLoading(true)
        const response = await axios.get (
          `/api/pdfGenerator/${testId}`, {
            responseType: 'blob',
            params: {
                version, 
                mixExercises, 
                mixChooseAnswers, 
                appendWithSolved
            }
          })
        setLoading(false)

        fileDownload(response.data, 'test.pdf')
    }

    const handleOpen = () => {
        setOpen(true)
      }
    
    const handleClose = () => {
        setOpen(false)
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
                    startIcon={ loading ? <CircularProgress size={"20px"}/> : <DownloadIcon /> } 
                    onClick={(e) => {
                            e.preventDefault()
                            handleOpen()
                        }
                    } 
                    
                    > 
                        Download test
            </Button>
        </> 
    )
}