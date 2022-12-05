import React, { useState } from "react";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import axios from "axios";

function SimpleDialog(props) {
  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
  };

  // 教材の削除
  const deleteTextbook = (id) => {
    const url = `http://localhost:3001/textbook/${id}`;
    axios.delete(url).then((response) => {
      handleClose();
    });
  };

  // 教材名の編集
  const handleUpdate = (id) => {
    const url = `http://localhost:3001/textbook/${id}`;
    const name = props.value;
    axios.put(url, { name }).then((response) => {
      handleClose();
    });
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle sx={{ padding: "1.6rem 2.4rem 0 1.6rem" }}>
        教材を編集
      </DialogTitle>
      <List sx={{ p: 0 }}>
        <ListItem>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-basic"
              label="教材名を入力"
              variant="outlined"
              onInput={props.handleChange}
            />
          </Box>
        </ListItem>
      </List>
      <List sx={{ paddingTop: 0 }}>
        <ListItem>
          <Stack direction="row" spacing={1}>
            <Button
              sx={{ fontSize: "0.8rem", padding: 0 }}
              onClick={handleClose}
            >
              戻る
            </Button>
            <Button
              variant="outlined"
              color="primary"
              size="small"
              sx={{ fontSize: "0.8rem" }}
              onClick={(e) => handleUpdate(props.data.id, e)}
            >
              編集を登録
            </Button>
            <Button
              variant="outlined"
              color="error"
              size="small"
              sx={{ fontSize: "0.8rem" }}
              onClick={(e) => deleteTextbook(props.data.id, e)}
            >
              教材を削除
            </Button>
          </Stack>
        </ListItem>
      </List>
    </Dialog>
  );
}

function EditTextbook(props) {
  const [open, setOpen] = useState(false);
  const [textUpdate, setTextUpdate] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  // 編集中の教材名のstateを管理
  const handleChange = (e) => {
    setTextUpdate(e.target.value);
  };

  return (
    <div>
      <Tooltip title="教材の編集・削除">
        <IconButton sx={{ padding: "0.2rem" }} onClick={handleClickOpen}>
          <EditIcon sx={{ fontSize: "0.8rem" }} />
        </IconButton>
      </Tooltip>
      <SimpleDialog
        open={open}
        handleChange={handleChange}
        onClose={handleClose}
        value={textUpdate}
        data={props.data}
      />
    </div>
  );
}

export default EditTextbook;
