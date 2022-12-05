import React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

function TextbookMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{ padding: 0, color: "black" }}
      >
        {props.data.name}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        sx={{ padding: 0 }}
      >
        <MenuItem
          onClick={handleClose}
          sx={{ padding: 0, height: "0.6rem", overflow: "hidden" }}
        >
          <Tooltip title="Delete">
            <IconButton
              sx={{ padding: "0.1rem" }}
              onClick={(e) => props.delete(props.data.id, e)}
            >
              <DeleteIcon sx={{ fontSize: "0.8rem" }} />
            </IconButton>
          </Tooltip>
        </MenuItem>
      </Menu>
    </div>
  );
}

export default TextbookMenu;
