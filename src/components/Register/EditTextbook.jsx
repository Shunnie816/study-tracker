import React, { useState } from "react";
import { useForm } from "react-hook-form";
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
import { DeleteTextbook, db } from "../index";
// import axios from "axios";
import { doc, setDoc } from "firebase/firestore";

function SimpleDialog(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
  };

  // 教材名の編集
  const handleUpdate = async (id) => {
    // const url = `http://localhost:3001/textbook/${id}`;
    // const name = props.value;
    // axios.put(url, { name }).then((response) => {
    //   handleClose();
    // });

    const name = props.value;
    // props.valueの初期値が空欄("")なので空欄で変更されないように分岐
    if (name === props.data.name || name === "") {
      handleClose();
      console.log("編集されていません");
    } else {
      await setDoc(doc(db, "textbooks", id), {
        name: name,
      });
      console.log("編集が実行されました");
      handleClose();
    }
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
            {/* 入力エラーの有無で表示するフォームを分岐 */}
            {!errors.textbookEdit ? (
              <TextField
                id="outlined-basic"
                label="教材名を入力"
                defaultValue={props.data.name}
                variant="outlined"
                onInput={props.handleChange}
                {...register("textbookEdit", {
                  required: "教材名を入力してください",
                })}
              />
            ) : (
              errors.textbookEdit?.message && (
                <TextField
                  error
                  id="outlined-basic"
                  label="教材名を入力"
                  defaultValue={props.data.name}
                  variant="outlined"
                  onInput={props.handleChange}
                  helperText={errors.textbookEdit.message}
                />
              )
            )}
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
              onClick={handleSubmit((e) => handleUpdate(props.data.id, e))}
            >
              編集を登録
            </Button>
            <DeleteTextbook data={props.data} />
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
