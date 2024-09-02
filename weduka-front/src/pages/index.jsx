import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import {
  Button,
  Container,
  Table,
  Box,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  IconButton,
} from "@mui/material";
import ContactsDialog from "../components/organisms/ContactsDialog";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import ContactsIcon from "@mui/icons-material/Contacts";
import { usersApi } from "../clients/users";

const Users = () => {
  const [openContacts, setOpenContacts] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleCloseContacts = () => {
    setOpenContacts(false);
    setSelectedUser(null);
  };

  const contactsClick = (user, edit) => {
    setSelectedUser(user);
    setOpenContacts(true);
  };

  const [modifingAt, setModifingAt] = useState(undefined);
  const [users, setUsers] = useState(undefined);

  async function getUsers() {
    const users = (await usersApi.list()) ?? [];
    console.log(users);

    const liftedUsers = users?.map((usr) => {
      return {
        id: usr.data.id,
        user: usr.data.attributes,
        contacts: usr.data.included.contacts,
      };
    });

    setUsers(liftedUsers);
  }

  useEffect(() => {
    getUsers();
  }, []);

  const [modifingUser, setModifingUser] = useState({
    id: undefined,
    lastName: undefined,
    firstName: undefined,
    age: undefined,
    gender: undefined,
    maritalStatus: undefined,
    cpf: undefined,
  });

  const saveRow = async (user, ix) => {
    const payload = {
      data: {
        type: "users",
        attributes: {
          ...(!!modifingUser.firstName
            ? { firstName: modifingUser.firstName }
            : {}),
          ...(!!modifingUser.lastName
            ? { lastName: modifingUser.lastName }
            : {}),
          ...(!!modifingUser.gender ? { gender: modifingUser.gender } : {}),
          ...(!!modifingUser.cpf ? { cpf: modifingUser.cpf } : {}),
          ...(!!modifingUser.maritalStatus
            ? { maritalStatus: modifingUser.maritalStatus }
            : {}),
          ...(!!modifingUser.age ? { age: modifingUser.age } : {}),
        },
      },
    };

    if (!!user.id) {
      const response = await usersApi.update(user.id, payload);

      if (!!response) {
        getUsers();
      }
    } else {
      const response = await usersApi.create(payload);
      const newUsersList = [...users];

      newUsersList.shift();
      newUsersList.unshift({
        id: response.id,
        user: response.attributes,
        contacts: response.included.contacts,
      });

      setUsers(newUsersList);
    }

    setModifingAt(undefined);
  };

  const handleChange = (event) => {
    setModifingUser({
      ...modifingUser,
      [event.target.name]: event.target.value,
    });
  };

  const newUser = () => {
    const newUser = users;
    newUser.unshift({
      lastName: undefined,
      firstName: undefined,
      age: undefined,
      gender: undefined,
      maritalStatus: undefined,
      cpf: undefined,
    });
    setUsers(newUser);
    setModifingAt(0);
  };

  const editRow = (user, ix) => {
    setModifingUser({
      id: user.id,
      ...user.user,
    });

    setModifingAt(ix);
  };

  const removeRow = async (user, ix) => {
    if (!!user.id) {
      const response = await usersApi.delete(user.id);
      if (!!response) {
        getUsers();
      }
    } else {
      const newUser = users;
      newUser.shift();
      setUsers(newUser);
      setModifingAt(undefined);
    }
  };

  return (
    <Container>
      <Box
        sx={{
          alignItems: "righ ",
          display: "flex",
          justifyContent: "space-between",
          mb: 3,
          mt: 2,
        }}
      >
        <Typography variant="h5">Usuários</Typography>
        {!modifingAt && modifingAt !== 0 && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => newUser()}
            startIcon={<AddIcon />}
          >
            Cadastrar
          </Button>
        )}
      </Box>

      <Container>
        <Table sx={{ width: "100%", paddingLeft: "0px" }}>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Sobrenome</TableCell>
              <TableCell width="10%">Idade</TableCell>
              <TableCell width="10%">Gênero</TableCell>
              <TableCell>Estado civil</TableCell>
              <TableCell>CPF</TableCell>
              <TableCell align="right">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!!users &&
              users?.map((liftedUser, ix) => (
                <TableRow key={liftedUser.id} hover>
                  <TableCell>
                    {modifingAt == ix ? (
                      <TextField
                        name="firstName"
                        required={true}
                        variant="standard"
                        value={modifingUser.firstName}
                        onChange={handleChange}
                      />
                    ) : (
                      liftedUser?.user?.firstName
                    )}
                  </TableCell>
                  <TableCell>
                    {modifingAt == ix ? (
                      <TextField
                        name="lastName"
                        required={true}
                        variant="standard"
                        value={modifingUser.lastName}
                        onChange={handleChange}
                      />
                    ) : (
                      liftedUser?.user?.lastName
                    )}
                  </TableCell>
                  <TableCell width="10%">
                    {modifingAt == ix ? (
                      <TextField
                        name="age"
                        required={true}
                        variant="standard"
                        value={modifingUser.age}
                        onChange={handleChange}
                      />
                    ) : (
                      liftedUser?.user?.age
                    )}
                  </TableCell>
                  <TableCell width="10%">
                    {modifingAt == ix ? (
                      <TextField
                        name="gender"
                        required={true}
                        variant="standard"
                        value={modifingUser.gender}
                        onChange={handleChange}
                      />
                    ) : (
                      liftedUser?.user?.gender
                    )}
                  </TableCell>
                  <TableCell>
                    {modifingAt == ix ? (
                      <TextField
                        name="maritalStatus"
                        required={true}
                        variant="standard"
                        value={modifingUser.maritalStatus}
                        onChange={handleChange}
                      />
                    ) : (
                      liftedUser?.user?.maritalStatus
                    )}
                  </TableCell>
                  <TableCell>
                    {modifingAt == ix ? (
                      <TextField
                        name="cpf"
                        required={true}
                        variant="standard"
                        value={modifingUser.cpf}
                        onChange={handleChange}
                      />
                    ) : (
                      liftedUser?.user?.cpf
                    )}
                  </TableCell>
                  <TableCell align="right">
                    {!(modifingAt == ix) && (
                      <IconButton
                        color="primary"
                        onClick={(e) => {
                          e.stopPropagation();
                          editRow(liftedUser, ix);
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    )}
                    {modifingAt == ix && (
                      <IconButton
                        color="primary"
                        onClick={(e) => {
                          e.stopPropagation();
                          saveRow(liftedUser, ix);
                        }}
                      >
                        <SaveIcon />
                      </IconButton>
                    )}
                    <IconButton
                      color="primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeRow(liftedUser, ix);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                    {!(modifingAt == ix) && (
                      <IconButton
                        color="primary"
                        onClick={(e) => {
                          e.stopPropagation();
                          contactsClick(liftedUser, false);
                        }}
                      >
                        <ContactsIcon />
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <ContactsDialog
          open={openContacts}
          onClose={handleCloseContacts}
          userContacts={selectedUser?.contacts}
          userId={selectedUser?.id}
        />
      </Container>
    </Container>
  );
};

export default Users;
