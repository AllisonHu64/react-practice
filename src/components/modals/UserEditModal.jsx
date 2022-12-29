import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

function UserEditModal(props) {
    const [name, setName] = useState('');
    const [nameErrorText, setNameErrorText] = useState('');
    const [age, setAge] = useState();
    const [ageErrorText, setAgeErrorText] = useState('');

    useEffect(()=>{
        setAge(props.user?.age?.toString());
        setAgeErrorText('');
        setName(props.user?.name);
        setNameErrorText('');
    }, [props.open])

    const validateName = () => {
        let errorText = '';
        if (name.length == 0) {
            errorText = 'Name field is required.';
        }

        if (!errorText && (name.length < 4 || name.length > 16)) {
            errorText = 'Name must be between 4 to 16 characters.';
        }

        if (!errorText && !new RegExp('^[A-Za-z]*$').test(name)) {
            errorText = 'Name must be composed only with letters.';
        }
        
        setNameErrorText(errorText)
        return errorText == '';
    }

    const validateAge = () => {
        let errorText = '';
        if (age.length == 0) {
            errorText = 'Age field is required.';
        }

        const ageInt = parseInt(age);
        if (!errorText && (ageInt < 0 || ageInt > 100)) {
            errorText = 'Age must be between 0 and 100.';
        }
        
        setAgeErrorText(errorText)
        return errorText == '';
    }

    const onSubmit = () => {
        if (validateAge() & validateName() &&  typeof props.onEdit == 'function') {
            props.onEdit({id: props.user?.id, name, age: parseInt(age)});
            props.handleClose();
        }
    }

    return (
        <Modal open={props.open} onClose={props.handleClose}>
            <Box sx={style}>
                <Typography align="center" variant="h6" component="h2" style={{fontWeight: "bold"}}>
                    {"Edit User"}
                </Typography>
                <TextField fullWidth
                    margin="normal"
                    error={nameErrorText != ''}
                    id="outlined-error-helper-text"
                    onChange={(event)=>setName(event.target.value)}
                    value={name}
                    label="Name"
                    helperText={nameErrorText}/>
                <TextField fullWidth
                    margin="normal"
                    type="number"
                    error={ageErrorText != ''}
                    id="outlined-error-helper-text"
                    onChange={(event)=>setAge(event.target.value)}
                    value={age}
                    label="Age"
                    helperText={ageErrorText}/>
                <Button 
                    align="center" 
                    size="small" 
                    startIcon={<CheckIcon />} 
                    onClick={onSubmit}>Confirm</Button>
                <Button 
                    align="center" 
                    size="small" 
                    startIcon={<CloseIcon />} 
                    onClick={props.handleClose}
                    color="error">Cancel</Button>
            </Box>
        </Modal>
    )
}

export default UserEditModal;