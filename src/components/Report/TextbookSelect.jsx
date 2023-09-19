/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Select from "@mui/material/Select";
// import { db } from "../index";
import axios from "axios";
import useBook from "../../contexts/useBook";
// import { collection, doc, getDocs, getDoc } from "firebase/firestore";

function TextbookSelect() {
  //グローバルなstateを取得する
  const { bookId, setBookId, dataBook, setDataBook } = useBook();

  const {
    register,
    formState: { errors },
  } = useFormContext();

  const handleChange = (event) => {
    setBookId(event.target.value);
  };

  // jsonから教材を取得
  useEffect(() => {
    axios.get("http://localhost:3001/textbook").then((response) => {
      const dataset = response.data;
      // console.log(dataset);
      setDataBook(dataset);
    });
  }, []);

  //firestoreからデータを取得
  // (async function () {
  //   const docSnaps = await getDocs(collection(db, "textbooks"));
  //   const textbooks = [];

  //   docSnaps.forEach(async (book) => {
  //     const docRef = doc(db, "textbooks", book.id);
  //     const docSnap = await getDoc(docRef);
  //     const dataset = docSnap.data();

  //     // idとnameを持つオブジェクトとして配列textbooksにデータを格納してからステートdataに渡す(常にdataが更新されて処理が重そう)
  //     textbooks.push({ id: book.id, name: dataset.name });
  //     setDataBook(textbooks);
  //   });
  // })();

  const textbookData = dataBook;

  return (
    <Box sx={{ width: "80%", margin: "1.0rem 0.7rem" }}>
      {!errors.textbook ? (
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">教材選択</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={bookId}
            label="教材選択"
            onChange={handleChange}
          >
            {/* 教材一覧を表示 */}
            {textbookData.map((textbook, index) => (
              <MenuItem
                value={textbook.id}
                key={textbook.id}
                {...register("textbook", {
                  required: "教材を選択してください。",
                })}
              >
                {textbook.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ) : (
        errors.textbook?.message && (
          <FormControl fullWidth error>
            <InputLabel id="demo-simple-select-label">教材選択</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={bookId}
              label="教材選択"
              onChange={handleChange}
            >
              {/* 教材一覧を表示 */}
              {textbookData.map((textbook, index) => (
                <MenuItem
                  value={textbook.id}
                  key={textbook.id}
                  {...register("textbook", {
                    required: "教材を選択してください。",
                  })}
                >
                  {textbook.name}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>{errors.textbook.message}</FormHelperText>
          </FormControl>
        )
      )}
    </Box>
  );
}
export default TextbookSelect;
