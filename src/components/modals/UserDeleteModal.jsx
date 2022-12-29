import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

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

function UserDeleteModal(props) {
    const onSubmit = () => {
        props.onDelete()
        props.handleClose();
    }

    return (
        <Modal open={props.open} onClose={props.handleClose}>
            <Box sx={style}>
                <Typography align="center" variant="h6" component="h6" style={{fontWeight: "bold"}}>
                    {'Delete User'}
                </Typography>
                <Typography align="center" variant="h10" component="div" m={2}>
                    {`Do you want to delete the user(${props.user.name})?`}
                </Typography>
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

export default UserDeleteModal;