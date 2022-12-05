/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";

function TextbookSelect(props) {
  const handleChange = (event) => {
    props.setId(event.target.value);
  };

  useEffect(() => {
    axios.get("http://localhost:3001/textbook").then((response) => {
      const dataset = response.data;
      props.setData(dataset);
    });
  }, []);

  const textbookData = props.data;

  return (
    <Box sx={{ width: "80%", margin: "1.0rem 0.7rem" }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">教材選択</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props.bookId}
          label="教材選択"
          onChange={handleChange}
        >
          {/* 教材一覧を表示 */}
          {textbookData.map((textbook, index) => (
            <MenuItem value={textbook.id} key={textbook.id}>
              {textbook.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
export default TextbookSelect;
