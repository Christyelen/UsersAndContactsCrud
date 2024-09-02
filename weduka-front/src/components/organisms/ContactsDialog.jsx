import React, { useState, useEffect } from "react";
import {
  TextField,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Button,
  Box,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CancelIcon from "@mui/icons-material/Cancel";
import AddIcon from "@mui/icons-material/Add";
import { contactsApi } from "../../clients/contacts";

const ContactsDialog = ({ open, onClose, userContacts, userId }) => {
  const handleCloseDialog = () => {
    if (onClose) {
      onClose();
      setModifingAt(undefined);
    }
  };

  const [modifingContact, setModifingContact] = useState({
    id: undefined,
    contactType: undefined,
    contactValue: undefined,
  });

  const handleChange = (event) => {
    setModifingContact({
      ...modifingContact,
      [event.target.name]: event.target.value,
    });
  };

  const [modifingAt, setModifingAt] = useState(undefined);
  const [contacts, setContacs] = useState(userContacts);

  useEffect(() => {
    setContacs(userContacts);
  }, [userContacts]);

  const newContact = () => {
    const newContacts = contacts;
    newContacts.unshift({ contact: undefined, typeContact: undefined });
    setContacs(newContacts);
    setModifingAt(0);
  };

  const saveRow = async (contact, ix) => {
    const payload = {
      data: {
        type: "contacts",
        attributes: {
          ...(!!modifingContact.contactType
            ? { contactType: modifingContact.contactType }
            : {}),
          ...(!!modifingContact.contactValue
            ? { contactValue: modifingContact.contactValue }
            : {}),
        },
      },
    };

    if (!!contact.id) {
      const response = await contactsApi.update(userId, contact.id, payload);

      if (!!response) {
        const newContactsList = [...response.included.contacts];
        setContacs(newContactsList);
      }
    } else {
      const response = await contactsApi.create(userId, payload);

      if (!!response) {
        const newContactsList = [...response.included.contacts];
        setContacs(newContactsList);
      }
    }

    setModifingContact({
      id: undefined,
      contactType: undefined,
      contactValue: undefined,
    });
    setModifingAt(undefined);
  };

  const editRow = (contact, ix) => {
    setModifingContact({
      ...contact,
    });

    setModifingAt(ix);
  };

  const removeRow = async (contact, ix) => {
    if (!!contact.id) {
      const response = await contactsApi.delete(userId, contact.id);

      if (!!response) {
        const newContactsList = [...response.included.contacts];
        setContacs(newContactsList);
      }
    } else {
      const newContacts = contacts;
      newContacts.shift();
      setContacs(newContacts);
    }

    setModifingAt(undefined);
  };

  return (
    <Dialog fullWidth maxWidth="lg" open={open} onClose={handleCloseDialog}>
      <DialogTitle>
        <Box
          sx={{
            alignItems: "righ ",
            display: "flex",
            justifyContent: "space-between",
            mb: 3,
          }}
        >
          Contatos do Usuário
          <Box
            sx={{
              alignItems: "rigth",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {!modifingAt && modifingAt !== 0 && (
              <Button
                variant="contained"
                color="primary"
                onClick={() => newContact()}
                startIcon={<AddIcon />}
              >
                Cadastrar
              </Button>
            )}
            <Button
              variant="contained"
              color="grey"
              sx={{ ml: 2 }}
              onClick={handleCloseDialog}
              startIcon={<CancelIcon />}
            >
              Cancelar
            </Button>
          </Box>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Table sx={{ width: "100%" }}>
          <TableHead>
            <TableRow>
              <TableCell>Tipo Contato</TableCell>
              <TableCell>Contato</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!!contacts &&
              contacts?.map((ctt, ix) => (
                <TableRow key={ctt.id} hover>
                  <TableCell>
                    {modifingAt == ix ? (
                      <TextField
                        name="contactValue"
                        required="true"
                        variant="standard"
                        value={modifingContact.contactValue}
                        onChange={handleChange}
                      />
                    ) : (
                      ctt?.contactValue
                    )}
                  </TableCell>
                  <TableCell>
                    {modifingAt == ix ? (
                      <TextField
                        name="contactType"
                        required="true"
                        variant="standard"
                        value={modifingContact.contactType}
                        onChange={handleChange}
                      />
                    ) : (
                      ctt?.contactType
                    )}
                  </TableCell>
                  <TableCell>
                    {!(modifingAt == ix) && (
                      <IconButton
                        color="primary"
                        onClick={(e) => {
                          e.stopPropagation();
                          editRow(ctt, ix);
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
                          saveRow(ctt, ix);
                        }}
                      >
                        <SaveIcon />
                      </IconButton>
                    )}
                    <IconButton
                      color="primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeRow(ctt, ix);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
};

export default ContactsDialog;
