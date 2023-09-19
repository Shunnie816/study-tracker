import React, { useContext, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { Time, Textbook, TextInput } from "../index";
import "../../index.css";
import axios from "axios";
import useBook from "../../contexts/useBook";
// import { collection, addDoc } from "firebase/firestore";

function Report(props) {
  //グローバルなstateの取得
  const { bookId, setBookId } = useBook();

  //ローカルなstateの定義
  const [time, setTime] = useState("");
  const [studyContent, setStudyContent] = useState("");

  // バリデーションチェック用のメソッド
  const useFormMethods = useForm();
  const { handleSubmit } = useFormMethods;

  // アラート表示用のstate
  const [alert, setAlert] = useState(false);
  const [open, setOpen] = useState(false);

  // 入力を確定してフィールドを初期値に戻す
  const commitData = async (event) => {
    // 投稿時の今日の日付
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const hours = today.getHours();
    const minute = today.getMinutes();

    // データベースのpostにデータを入れる
    const content = studyContent;

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
        setAlert(true);
        setOpen(true);
        // event.preventDefault();
      });
    // 初期値に戻す
    setTime("");
    setStudyContent("");
    setBookId("");

    // firestoreへデータを追加
    // await addDoc(collection(db, "posts"), {
    //   year: year,
    //   month: month,
    //   day: day,
    //   hours: hours,
    //   minute: minute,
    //   time: time,
    //   bookId: bookId,
    //   content: content,
    // });
    // setAlert(true);
    // setOpen(true);
    // 初期値に戻す
    // setTime("");
    // setStudyContent("");
    //setBookId("");
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
            <Time time={time} setTime={setTime} />
            <Textbook />
            <TextInput
              studyContent={studyContent}
              setStudyContent={setStudyContent}
            />
            {alert && open ? (
              <Alert
                severity="success"
                sx={{ width: "80%", margin: "0 0.7rem" }}
                onClose={() => {
                  setOpen(false);
                }}
              >
                学習記録完了!
              </Alert>
            ) : (
              <></>
            )}
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

export default Report;
