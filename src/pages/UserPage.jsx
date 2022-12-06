import UserCard from "../components/cards/UserCard";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import UserActionModal from "../components/modals/UserActionModal";
import { useState } from 'react';
import Grid from "@mui/material/Grid";
import { UserActionModalType } from '../Enum/enum';


function UserPage() {
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const handleOpenAddModal = () => setOpenAddModal(true);
    const handleCloseAddModal = () => {setOpenAddModal(false); setChosenUser({});};
    const handleOpenEditModal = () => setOpenEditModal(true);
    const handleCloseEditModal = () => setOpenEditModal(false);
    const [users, setUsers] = useState([{id: 1, name: 'ztgg', age: 1}, {id: 2, name: 'demo', age: 2}])
    const [chosenUser, setChosenUser] = useState({});

    const newUserId = () => {
        if (users.length == 0) {
            return 1;
        }
        return users[users.length - 1] + 1;
    }

    const addUser = (payloads) => {
        const usersCopy = users.slice();
        usersCopy.push({id:newUserId(), ...payloads});
        setUsers(usersCopy);
    }

    const editUser = (payloads) => {
        const usersCopy = users.slice();
        for (let i = 0; i < usersCopy.length; i++) {
            if (chosenUser && usersCopy[i].id == chosenUser.id) {
                usersCopy[i] = {...usersCopy[i], ...payloads};
                break;
            }
        }
        setUsers(usersCopy);
    }

    const generateDeleteUserFunction = (id) => {
        return () => setUsers(users.filter((user)=> user.id != id))
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
                                onDeleteClick={generateDeleteUserFunction(user.id)}>
                            </UserCard>
                        </Grid>
                    )
                })}
            </Grid>
        </Box>
        <UserActionModal open={openAddModal} handleClose={handleCloseAddModal} action={UserActionModalType.Add} onSubmit={addUser}/>
        <UserActionModal open={openEditModal} user={chosenUser} handleClose={handleCloseEditModal} action={UserActionModalType.Edit} onSubmit={editUser}/>
    </div>
    )
}

export default UserPage;