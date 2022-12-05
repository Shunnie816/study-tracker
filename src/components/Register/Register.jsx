/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { TextbookInput, TextbookMenu } from "../index";
import "../../index.css";
import axios from "axios";

function Register(props) {
  const dataInput = (event) => {
    const name = props.value;
    axios.post("http://localhost:3001/textbook", { name }).then((response) => {
      alert("教材登録完了");
      event.preventDefault();
    });

    props.onSelect("");
  };

  // 登録されている教材を削除
  const deleteTextbook = (id) => {
    const url = `http://localhost:3001/textbook/${id}`;
    axios.delete(url).then((response) => {
      alert(`教材を削除しました`);
    });
  };

  useEffect(() => {
    axios.get("http://localhost:3001/textbook").then((response) => {
      const dataset = response.data;
      props.setData(dataset);
    });
  }, []);

  return (
    <>
      <CssBaseline />
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Box
          component="span"
          sx={{
            width: 360,
            height: 480,
            border: "3px solid",
            borderColor: "primary.main",
            borderRadius: 1,
          }}
        >
          <TextbookInput value={props.value} onSelect={props.onSelect} />
          <div className="button">
            <Button variant="contained" onClick={dataInput}>
              登録
            </Button>
          </div>
          <div className="registeredBook">
            <h2>登録済みの教材</h2>
            {/* 教材の編集ボタン */}
            <Tooltip title="教材の編集">
              <IconButton sx={{ padding: "0.2rem" }}>
                <EditIcon />
              </IconButton>
            </Tooltip>

            <ul className="textBookList">
              {props.data.map((textbook, index) => (
                <ol key={textbook.id}>
                  <TextbookMenu data={textbook} delete={deleteTextbook} />
                </ol>
              ))}
            </ul>
          </div>
        </Box>
      </Container>
    </>
  );
}

export default Register;
