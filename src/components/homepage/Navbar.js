import React from "react";
import Signin from "./Signin";
import logo from "../../resources/medi.png";
import { Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const styles = makeStyles({
    bar:{
        paddingTop: "1.15rem",
        backgroundColor: "#fff",
        '@media (max-width:780px)': { 
           flexDirection: "column"
          }
    },
    logo: {
        width: "15%", 
        '@media (max-width:780px)': { 
           display: "none"
           }
    },
    logoMobile:{
        width: "100%", 
        display: "none", 
        '@media (max-width:780px)': { 
            display: "inline-block"
            }
    },
    menuItem: {
        cursor: "pointer", 
        flexGrow: 1,
        "&:hover": {
            color:  "#4f25c8"
        },
        '@media (max-width:780px)': { 
            paddingBottom: "1rem"    }
    }
})

export default function Navbar(props) {
    const classes = styles()
  return (
    <Toolbar
      position="sticky"
      color="rgba(0, 0, 0, 0.87)"
      className={classes.bar}
    >
      <img src={logo} className={classes.logo} alt = 'logo'/>
      <p>    </p>
      <Typography variant="h6" className={classes.menuItem}>
        About
      </Typography>
      <Typography variant="h6" className={classes.menuItem}>
        Blog
      </Typography>
      <Typography variant="h6" className={classes.menuItem}>
        Careers
      </Typography>
      <Typography variant="h6" className={classes.menuItem}>
        Demos
      </Typography>
      <Typography variant="h6" className={classes.menuItem}>
        Contact Us
      </Typography>
      <Signin signInWithGoogle = {props.signInWithGoogle} />
    </Toolbar>
  );
}
