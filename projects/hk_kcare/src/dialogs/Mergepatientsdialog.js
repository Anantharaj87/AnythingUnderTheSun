import React, { useState, useEffect, useRef } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


export default function MergePatientsDialog({open, dialogheader, selectedPatients, handleClose}) {

//console.log(open);
//console.log(handleClose);
//console.log(selectedPatients.current);

//console.log(dayjs('2022-04-17'));

 const [id, setID] = useState('');
 const [name, setName] = useState('');
 const [dob, setDOB] = useState(null);
 const [sex, setSex] = useState('');
 const [phno, setPhno] = useState('');

useEffect(() => {
	console.log(selectedPatients.current);

	if (selectedPatients.current.length == 1) {
		setID(selectedPatients.current[0]._id);		

		setName(selectedPatients.current[0].name);

		if (selectedPatients.current[0].dob) {
			setDOB(dayjs(selectedPatients.current[0].dob, 'YYYY-MM-DD'));
		} else {
			setDOB(dayjs('', 'YYYY-MM-DD'));
		}

		setSex(selectedPatients.current[0].sex);
		setPhno(selectedPatients.current[0].phno);
	}

	console.log(name);
	//console.log(dob);
	console.log(sex);
	console.log(phno);

  }, [open]);



useEffect(() => {
	console.log(dob);
}, [dob]);

/*
useEffect(() => {
	alert("opendeletedialog");	
}, []);
*/
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={(e) => handleClose(e, false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {dialogheader}
        </DialogTitle>
        <DialogContent>
          <TextField value={name}
		  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
		    setName(event.target.value);
			console.log(name);
		  }} />

	    <LocalizationProvider dateAdapter={AdapterDayjs}>
	      <DemoContainer components={['DatePicker', 'DatePicker']}>
		
		<DatePicker
		  label="Controlled picker"
		  value={dob}
		  onChange={(newValue) => {
				setDOB(newValue);
				console.log(newValue.format('YYYY-MM-DD'));
				}
			}
		/>
	      </DemoContainer>
	    </LocalizationProvider>

	<Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={sex}
          label="Sex"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
		    setSex(event.target.value);
			console.log(sex);
		  }}
        >
          <MenuItem value={'MALE'}>MALE</MenuItem>
          <MenuItem value={'FEMALE'}>FEMALE</MenuItem>
          <MenuItem value={'TRANSGENDER'}>TRANSGENDER</MenuItem>
        </Select>
	
	<TextField value={phno}
		  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
		    setPhno(event.target.value);
			console.log(phno);
		  }} />

        </DialogContent>
        <DialogActions>
          <Button onClick={(e) => {
			
			if (dob.isValid()) {
				handleClose(e, {_id: id, name: name, dob: dob.format('YYYY-MM-DD'), sex: sex, phno: phno});
			} else {
				handleClose(e, {_id: id, name: name, sex: sex, phno: phno});
			}
		}
	} autoFocus>
            Yes
          </Button>
	  <Button onClick={(e) => handleClose(e, null)} autoFocus>
            No
          </Button>
        </DialogActions>

      </Dialog>
    </React.Fragment>
  );
}
