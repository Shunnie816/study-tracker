import React from "react";
import { useFormContext } from "react-hook-form";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

function TextbookInput(props) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

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
      {/* 入力エラーの有無で表示するフォームを分岐 */}
      {!errors.textbook ? (
        <TextField
          id="outlined-basic"
          label="教材名を入力"
          variant="outlined"
          onInput={handleChange}
          value={props.value}
          {...register("textbook", {
            required: "教材名が入力されていません。",
          })}
        />
      ) : (
        errors.textbook?.message && (
          <TextField
            error
            id="outlined-basic"
            label="教材名を入力"
            variant="outlined"
            onInput={handleChange}
            value={props.value}
            helperText={errors.textbook.message}
          />
        )
      )}
    </Box>
  );
}

export default TextbookInput;
