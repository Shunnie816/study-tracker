import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { Time, Textbook, TextInput } from "../index";
import "../../index.css";
import axios from "axios";

function BoxSx(props) {
  // バリデーションチェック用のメソッド
  const useFormMethods = useForm();
  const { handleSubmit } = useFormMethods;

  // 入力を確定してフィールドを初期値に戻す
  const commitData = (event) => {
    // 投稿時の今日の日付
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const hours = today.getHours();
    const minute = today.getMinutes();

    // データベースのpostにデータを入れる
    const time = props.time;
    const content = props.content;
    const bookId = props.bookId;

    axios
      .post("http://localhost:3001/posts", {
        year,
        month,
        day,
        hours,
        minute,
        time,
        bookId,
        content,
      })
      .then((response) => {
        alert("学習記録完了");
        event.preventDefault();
      });
    // 初期値に戻す
    props.onSelect("");
    props.inputContent("");
    props.setId("");
  };

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
          <FormProvider {...useFormMethods}>
            <Time time={props.time} onSelect={props.onSelect} />
            <Textbook
              data={props.data}
              setData={props.setData}
              bookId={props.bookId}
              setId={props.setId}
            />
            <TextInput
              content={props.content}
              inputContent={props.inputContent}
            />
            <div className="button">
              <Button variant="contained" onClick={handleSubmit(commitData)}>
                確定
              </Button>
            </div>
          </FormProvider>
        </Box>
      </Container>
    </>
  );
}

export default BoxSx;
