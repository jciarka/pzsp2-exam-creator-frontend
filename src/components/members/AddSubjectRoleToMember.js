import React, { useState, useEffect } from "react";
import axios from "axios";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select"; 

const AddSubjectRoleToMember = ({ userId, subjectId, onCancel, onSuccess }) => {

  const addSubjectRoleToMember = async () => {
    console.log(`/api/subjectuser/${subjectId}/${userId}/roles/${role}`)
    const result = await axios.post(`/api/subjectuser/${subjectId}/${userId}/roles/${role}`, {});
    
    if (result && result.data && result.data.ok) {
      onSuccess();
    }
  };

  const [role, setRole] = useState('WRITE');

  const roles = [
      'ADMIN',
      'WRITE',
      'DELETE'
  ]

  return (
    <>
      <DialogTitle>Give user new responibilites</DialogTitle>
      <DialogContent style={{ minWidth: "450px" }}>
        <DialogContentText>
          <div className="p-1">

            <FormControl className="my-2" fullWidth>
              <InputLabel size="small" id="demo-simple-select-label">
                Authority
              </InputLabel>
              <Select
                size="small"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={role}
                label="Authority"
                onChange={(e) => {
                  setRole(e.target.value);
                }}
              >
                {roles.map((t) => {
                  return (
                    <MenuItem key={t} value={t}>
                      {t}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={onCancel}>
          Cancel
        </Button>
        {/* <Button disabled={!validate()} onClick={addSubjectRoleToMember}> */}
        <Button color="primary" onClick={addSubjectRoleToMember}>
          Confirm
        </Button>
      </DialogActions>
    </>
  );
};

export default AddSubjectRoleToMember;
