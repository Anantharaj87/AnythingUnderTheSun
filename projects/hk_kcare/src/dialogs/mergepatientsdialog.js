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
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function MergePatientsDialog({open, dialogheader, selectedPatients, handleClose}) {

/* const [id, setID] = useState('');
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
*/

 const [mergeCandidateID, setMergeCandidateID] = useState("")

  const onOptionChange = e => {
    console.log(e.target.value);
    setMergeCandidateID(e.target.value);
  }



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
          <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
	    <TableCell>Target</TableCell>
            <TableCell>Name</TableCell>
            <TableCell align="right">Age</TableCell>
            <TableCell align="right">DOB</TableCell>
            <TableCell align="right">Sex</TableCell>
            <TableCell align="right">Phone No.</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {selectedPatients.current.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
		        <input
			type="radio"
			name="mergecandidate"
			value={row.p_id}
			onChange={onOptionChange}
			/>
              </TableCell>
		<TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.age}</TableCell>
              <TableCell align="right">{row.dob}</TableCell>
              <TableCell align="right">{row.sex}</TableCell>
              <TableCell align="right">{row.phno}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

        </DialogContent>
        <DialogActions>
          <Button onClick={(e) => {
			
			
				handleClose(e, mergeCandidateID);
			
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
