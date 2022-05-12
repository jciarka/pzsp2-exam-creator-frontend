import React, { useState } from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';


const pdfLoaderDialog = ({ onCancel, onSuccess }) => {

  const [version, setVersion] = useState(null);
  const [mixExercises, setMixExercises] = useState(false);
  const [mixChooseAnswers, setMixChooseAnswers] = useState(false);
  const [appendWithSolved, setAppendWithSolved] = useState(false);

  return (
    <>
      <DialogTitle>Set pdf gernetor properties</DialogTitle>
      <DialogContent style={{ minWidth: "450px" }}>
      <FormControl className="my-2">
      <TextField
        value={version}
        style={{width: "200px"}}
        label="Version number"
        size="small"
        type="number"
        onInput={(e) => {
          Number(e.target.value) ? setVersion(e.target.value) : setVersion(null)
        }}
      />
      </FormControl>
      <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
                  checked={mixExercises}
                  onChange={() => setMixExercises(!mixExercises)}
                  name="mixExercises"
                  color="primary"
                />
                }
                label="Mix tasks"
            />
          <FormControlLabel
            control={
              <Checkbox
                    checked={mixChooseAnswers}
                    onChange={() =>setMixChooseAnswers(!mixChooseAnswers)}
                    name="MixABCDanswers"
                    color="primary"
                  />
                }
                label="Mix ABCD answers"
            />
          <FormControlLabel
            control={
              <Checkbox
                    checked={appendWithSolved}
                    onChange={() =>setAppendWithSolved(!appendWithSolved)}
                    name="appendWithSolved"
                    color="primary"
                  />
                }
                label="Add solved test"
            />              
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={() => onCancel()}>
          Cancel
        </Button>
        <Button color="primary" onClick={() => onSuccess({ version, mixExercises, mixChooseAnswers, appendWithSolved})}>
          Confirm
        </Button>
      </DialogActions>
    </>
  );
};

export default pdfLoaderDialog;

