import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function TimeSelect(props) {
  const handleChange = (event) => {
    props.onSelect(event.target.value);
  };

  // 時間の候補を格納する配列
  let items = [];
  for (let i = 5; i <= 180; i += 5) {
    items.push(i);
  }

  return (
    <Box sx={{ width: "80%", margin: "1.0rem 0.7rem" }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">学習時間</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props.time}
          label="学習時間"
          onChange={handleChange}
        >
          {items.map((item, index) => (
            <MenuItem value={item} key={item}>
              {item + "分"}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
export default TimeSelect;
