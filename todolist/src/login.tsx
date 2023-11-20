import Alert from '@mui/material/Alert';
import { ThemeProvider, createTheme } from "@mui/material/";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {handleErrors} from './Register'
import "./login.css";
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
type User = {
  username: string;
  password: string;
};
const user: User = {
  username: "",
  password: "",
};

const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
    user.username = e.target.value;
}


function Login() {
  const [submitErr, setSubmitErr] = useState("");
  const navigate = useNavigate();

    function loginUser(){
      const username = user.username;
      const password = user.password
      fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password}),
      })
        .then(handleErrors)
        .then(() => {
          setSubmitErr("")
          const verifiedUser = user.username;
          const verifiedPassword = user.password;
          navigate("/todos" , {state :{verifiedUser,verifiedPassword}});
        })
        .catch((error) => {
          console.log("we are here ", error);
          setSubmitErr(error.message);
        });
    }

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <div className="App">
          {" "}
          <form noValidate autoComplete="off" action="" className="logForm">
            <Typography sx={{p : 2}} variant="h4">
              Login Form
            </Typography>
                {!!submitErr &&
              <Alert severity="error">{submitErr}</Alert>
                }
            <TextField
              fullWidth
              label="Username"
              onChange={handleUserChange}
              sx={{ m: 1, color: "white" }}
              id="username"
              variant="outlined"
              required
            />
            <TextField
              fullWidth
              label="Password"
              onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{
                user.password=e.target.value;
              }}
              sx={{ m: 1, color: "white" }}
              id="password"
              variant="outlined"
              required
            />
            <Button
              fullWidth={true}
              onClick={loginUser}
              size="large"
              variant="contained"
              sx={{ mx: "auto", m: 1, fontWeight: 600 }}
            >
              Login
            </Button>
          </form>
        </div>
      </ThemeProvider>
    </>
  );
}

export default Login;
