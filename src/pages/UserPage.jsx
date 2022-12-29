import UserCard from "../components/cards/UserCard";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import Grid from "@mui/material/Grid";
import UserAddModal from "../components/modals/UserAddModal";
import UserEditModal from "../components/modals/UserEditModal";
import UserDeleteModal from "../components/modals/UserDeleteModal";
import UserApi from '../apis/UserApi'


function UserPage() {
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const handleOpenAddModal = () => setOpenAddModal(true);
    const handleCloseAddModal = () => {setOpenAddModal(false); setChosenUser({});};
    const handleOpenEditModal = () => setOpenEditModal(true);
    const handleCloseEditModal = () => setOpenEditModal(false);
    const handleOpenDeleteModal = () => setOpenDeleteModal(true);
    const handleCloseDeleteModal = () => setOpenDeleteModal(false);
    const [users, setUsers] = useState([])
    const [chosenUser, setChosenUser] = useState({});
    const userApi = new UserApi();

    const updateUsers = ()=>{
        userApi.getUsers()
            .then((res)=>setUsers(res.data))
            .catch(()=>alert("Failed to retrieve users info."))
    }
    useEffect(()=>{updateUsers()},[])

    const addUser = (payloads) => {
        userApi.addUser(payloads)
            .then(()=>{updateUsers();alert("Successfully added user.")})
            .catch((err)=>alert(err))
    }

    const editUser = (payloads) => {
        userApi.editUser(payloads)
            .then(()=>{updateUsers();alert("Successfully edited user.")})
            .catch((err)=>alert(err))
    }

    const deleteUser = (payloads) => {
        userApi.deleteUser(payloads)
            .then(()=>{updateUsers();alert("Successfully deleted user.")})
            .catch((err)=>alert(err))
    }

    return (
    <div>
        <Box
        sx={{
            display: 'flex',
            '& > :not(style)': {
            m: 2,
            width: "100%",
            },
        }}
        >
            <Grid container spacing={2}>
                <Grid item width={1}>
                    <Button onClick={handleOpenAddModal}>New User</Button>
                </Grid>
                {users.map((user, index)=>{
                    return (
                        <Grid item key={index}>
                            <UserCard user={user} 
                                onEditClick={()=>{handleOpenEditModal();setChosenUser(user)}}
                                onDeleteClick={()=>{handleOpenDeleteModal();setChosenUser(user)}}>
                            </UserCard>
                        </Grid>
                    )
                })}
            </Grid>
        </Box>
        <UserAddModal open={openAddModal} handleClose={handleCloseAddModal} onAdd={addUser}/>
        <UserEditModal open={openEditModal} user={chosenUser} handleClose={handleCloseEditModal} onEdit={editUser}/>
        <UserDeleteModal open={openDeleteModal} user={chosenUser} handleClose={handleCloseDeleteModal} onDelete={deleteUser}/>
    </div>
    )
}

export default UserPage;