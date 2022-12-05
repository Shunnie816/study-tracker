import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

function TextInput(props) {
  const handleChange = (event) => {
    props.inputContent(event.target.value);
  };

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { margin: "0.5rem 0.7rem", width: "80%" },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-basic"
        label="学習内容を入力"
        variant="outlined"
        onInput={handleChange}
        value={props.content}
      />
    </Box>
  );
}

export default TextInput;
