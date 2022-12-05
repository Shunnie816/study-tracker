import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

function TextbookInput(props) {
  const handleChange = (event) => {
    props.onSelect(event.target.value);
  };

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": {
          margin: "1.5rem 0.7rem 0.5rem 0.7rem",
          width: "80%",
        },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-basic"
        label="教材名を入力"
        variant="outlined"
        onInput={handleChange}
        value={props.value}
      />
    </Box>
  );
}

export default TextbookInput;
