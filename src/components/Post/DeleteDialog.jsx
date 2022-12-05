import React from "react";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import axios from "axios";

function SimpleDialog(props) {
  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
  };

  const deletePost = (id) => {
    const url = `http://localhost:3001/posts/${id}`;
    axios.delete(url).then((response) => {
      handleClose();
    });
  };

  const post = props.data;

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
            onClick={(e) => deletePost(post.id, e)}
          >
            投稿を削除
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
        投稿を削除
      </Button>
      <SimpleDialog open={open} onClose={handleClose} data={props.data} />
    </div>
  );
}

export default DeleteDialog;
