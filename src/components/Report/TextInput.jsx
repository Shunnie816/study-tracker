import React from "react";
import { useFormContext } from "react-hook-form";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

function TextInput(props) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

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
      {!errors.comment ? (
        <TextField
          id="outlined-basic"
          label="学習内容を入力"
          variant="outlined"
          onInput={handleChange}
          value={props.content}
          {...register("comment", {
            required: "学習内容を入力してください。",
          })}
        />
      ) : (
        errors.comment?.message && (
          <TextField
            error
            id="outlined-basic"
            label="学習内容を入力"
            variant="outlined"
            onInput={handleChange}
            value={props.content}
            helperText={errors.comment.message}
          />
        )
      )}
    </Box>
  );
}

export default TextInput;
