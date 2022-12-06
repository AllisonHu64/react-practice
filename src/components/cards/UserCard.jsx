import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


function UserCard(props) {
    const { user } = props;
    return (
    <Card sx={{ maxWidth: 345 }}>
        <CardContent>
            <Typography noWrap gutterBottom variant="h5" component="div">
                Name: {user.name}
            </Typography>
            <Typography noWrap variant="body2" color="text.secondary">
                Age: {user.age}
            </Typography>
        </CardContent>
        <CardActions>
            <Button size="small" startIcon={<EditIcon />} onClick={props.onEditClick}>Edit</Button>
            <Button size="small" startIcon={<DeleteIcon />} color="error" onClick={props.onDeleteClick}>Delete</Button>
        </CardActions>
    </Card>
    )
}

export default UserCard