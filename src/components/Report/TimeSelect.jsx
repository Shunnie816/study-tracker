import React from "react";
import { useFormContext } from "react-hook-form";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Select from "@mui/material/Select";

function TimeSelect(props) {
  const { time, setTime } = props;

  const {
    register,
    formState: { errors },
  } = useFormContext();

  const handleChange = (event) => {
    setTime(event.target.value);
  };

  // 時間の候補を格納する配列
  let items = [];
  for (let i = 5; i <= 180; i += 5) {
    items.push(i);
  }

  return (
    <Box sx={{ width: "80%", margin: "1.0rem 0.7rem" }}>
      {!errors.time ? (
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">学習時間</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={time}
            label="学習時間"
            onChange={handleChange}
          >
            {items.map((item, index) => (
              <MenuItem
                value={item}
                key={item}
                {...register("time", {
                  required: "学習時間を選択してください。",
                })}
              >
                {item + "分"}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ) : (
        errors.time?.message && (
          <FormControl fullWidth error>
            <InputLabel id="demo-simple-select-label">学習時間</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={time}
              label="学習時間"
              onChange={handleChange}
            >
              {items.map((item, index) => (
                <MenuItem value={item} key={item}>
                  {item + "分"}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>{errors.time.message}</FormHelperText>
          </FormControl>
        )
      )}
    </Box>
  );
}
export default TimeSelect;
