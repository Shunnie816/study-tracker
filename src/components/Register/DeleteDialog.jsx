import React from "react";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
// import axios from "axios";
import { db } from "../index";
import { doc, deleteDoc } from "firebase/firestore";

function SimpleDialog(props) {
  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
  };

  // 教材の削除
  const deleteTextbook = async (id) => {
    // const url = `http://localhost:3001/textbook/${id}`;
    // axios.delete(url).then((response) => {
    //   handleClose();
    // });

    await deleteDoc(doc(db, "textbooks", id));
    handleClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>本当に削除しますか？</DialogTitle>
      <List sx={{ pt: 0, display: "flex" }}>
        <ListItem>
          <Button onClick={handleClose}>キャンセル</Button>
        </ListItem>
        <ListItem>
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={(e) => deleteTextbook(props.data.id, e)}
          >
            教材を削除
          </Button>
        </ListItem>
      </List>
    </Dialog>
  );
}

function DeleteDialog(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="outlined"
        color="error"
        size="small"
        onClick={handleClickOpen}
      >
        教材を削除
      </Button>
      <SimpleDialog
        open={open}
        onClose={handleClose}
        data={props.data}
        deleteTextbook={props.deleteTextbook}
      />
    </div>
  );
}

export default DeleteDialog;
