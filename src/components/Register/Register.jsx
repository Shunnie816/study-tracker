/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { TextbookInput, TextbookMenu, db } from "../index";
import "../../index.css";
import axios from "axios";
import { collection, addDoc, doc, getDoc } from "firebase/firestore";

function Register(props) {
  // バリデーションチェック用
  const useFormMethods = useForm();
  const { handleSubmit } = useFormMethods;

  // アラート表示用のstate
  const [alert, setAlert] = useState(false);
  const [open, setOpen] = useState(false);

  // 教材の登録
  const dataInput = async (event) => {
    const name = props.value;
    // axios.post("http://localhost:3001/textbook", { name }).then((response) => {
    //   setAlert(true);
    //   setOpen(true);
    // event.preventDefault();
    // });

    // props.onSelect("");

    await addDoc(collection(db, "textbooks"), {
      name: name,
    });
    setAlert(true);
    setOpen(true);
    props.onSelect("");
  };

  // 登録されている教材を削除
  const deleteTextbook = (id) => {
    const url = `http://localhost:3001/textbook/${id}`;
    axios.delete(url).then((response) => {});
  };

  // 登録されている教材を取得
  // useEffect(() => {
  //   axios.get("http://localhost:3001/textbook").then((response) => {
  //     const dataset = response.data;
  //     props.setData(dataset);
  //   });
  // }, [props.data]);

  // データの取得
  useEffect(() => {
    const docRef = doc(db, "textbooks", "name");
    const docSnap = getDoc(docRef);
    const dataset = docSnap.data();
    props.setData(dataset);
  }, [props.data]);

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
            <TextbookInput value={props.value} onSelect={props.onSelect} />
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
              <Button variant="contained" onClick={handleSubmit(dataInput)}>
                登録する
              </Button>
            </div>
          </FormProvider>
          <div className="registeredBook">
            <h2>登録済みの教材</h2>
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
