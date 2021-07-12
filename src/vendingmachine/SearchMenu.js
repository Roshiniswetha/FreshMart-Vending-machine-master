import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import { fade } from "@material-ui/core/styles";
import Search from "@material-ui/icons/Search";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 1),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 1),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(54),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 1),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(0)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "24ch",
      "&:focus": {
        width: "24ch",
      },
    },
  },
}));

export default function SearchMenu({ searchValue}) {
  const classes = useStyles();
  const [value, setValue] = React.useState("");
  const handleClick = (e) => {
    setValue(e.target.value);
    searchValue(e.target.value);
  };
  return (
    <div className={classes.search}>
      <NavLink exact to="/index/Search" style={{ textDecoration: "none" }}>
        <InputBase
          placeholder="Search for.."
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          value={value}
          style={{
            color: "#424B53",
            textDecoration: "none",
          }}
          inputProps={{ "aria-label": "search" }}
          endAdornment={
            <Search
              style={{ marginRight: "7px", width: "25px", height: "22px" }}
            />
          }
          onChange={(e) => {
            handleClick(e);
          }}
        />
      </NavLink>
    </div>
  );
}