import "./register.css";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import { ThemeProvider, createTheme } from "@mui/material/";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Progress from "./components/progressbar.tsx";
import { Password } from "@mui/icons-material";
import Alert from "@mui/material/Alert";
// import { useHistory} from 'react';
import { useNavigate } from "react-router-dom";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
type User = {
  username: string;
  email: string;
  password: string;
  rpassword: string;
};
const user: User = {
  username: "",
  email: "",
  password: "",
  rpassword: "",
};
const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  user.username = e.target.value;
};
const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  user.email = e.target.value;
};

const handleRpasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  user.rpassword = e.target.value;
};

const PasswordChecker = (pass: string) => {
  const oprogress = {
    width: 0,
    color: "red",
  };
  const specialChars = /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/;
  const upperCase = /[A-Z]/;
  const hasNum = /[1-9]/;
  const hasNormal = /[a-z]/;
  let points = 0;
  if (pass.length > 4) {
    points += 1;
  }
  if (specialChars.test(pass)) {
    points += 1;
  }
  if (pass.length > 6) {
    points += 1;
  }
  if (upperCase.test(pass)) {
    points += 2;
  }
  if (hasNum.test(pass)) {
    points += 1;
  }
  if (hasNormal.test(pass)) {
    points += 1;
  }
  console.log(points);
  if (points >= 6) {
    oprogress.width = 100;
    oprogress.color = "green";
    return oprogress;
  } else if (points <= 5 && points > 3) {
    oprogress.width = 65;
    oprogress.color = "orange";
    return oprogress;
  } else if (points <= 3) {
    oprogress.width = 35;
    oprogress.color = "red";
    return oprogress;
  }

  return oprogress;
};

export const handleErrors = async (response: any) => {
  if (!response.ok) {
    const { message } = await response.json();
    throw Error(message);
  }
  return response.json();
};

function Register() {
  const [showPassword, setShowPassword] = useState(true);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [rpasswordError, setRpasswordError] = useState("");
  const [progressPropsSize, setProgressPropsSize] = useState(0);
  const [progressPropsColor, setProgressPropsColor] = useState("");
  const [submitErr, setSubmitErr] = useState("");

  // const history  = useHistory();
  const navigate = useNavigate();

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    user.password = e.target.value;
    const objProps = PasswordChecker(user.password);
    setProgressPropsSize(objProps.width);
    setProgressPropsColor(objProps.color);
  };

  const regexPattern = /^[a-zA-Z0-9]+$/;
  const formValidation = () => {
    // let err_count = 0;
    console.log(user);
    if (user.username === "") {
      setNameError("Username is required");
    } else if (!regexPattern.test(user.username) || user.username.length < 4) {
      setNameError(
        "User name should only contain letters and numbers and have more than 3 characters "
      );
    } else {
      setNameError("");
    }
    if (user.email === "") {
      setEmailError("Email is required");
    } else {
      setEmailError("");
    }
    if (user.password === "") {
      setPasswordError("Password is required");
    } else {
      setPasswordError("");
    }
    if (user.rpassword !== user.password) {
      setRpasswordError("the passwords are not the same");
    }
    const username = user.username;
    const email = user.email;
    const password = user.password;
    const answr = PasswordChecker(user.password);
    if (answr.width === 100) {
      fetch("http://localhost:4000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, email }),
      })
        .then(handleErrors)
        .then(() => {
          setSubmitErr("");
          const verifiedUser = user.username;
          navigate("/todos", { state: { verifiedUser } });
        })
        .catch((error) => {
          console.log("we are here ", error);
          setSubmitErr(error.message);
        });
    }
  };

  return (
    <div className="App">
      <div className="container">
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />

          <form noValidate autoComplete="off">
            {" "}
            <Box
              sx={{
                letterSpacing: 3,
                m: 2,
                fontWeight: "bold",
                fontSize: "h4.fontSize",
              }}
            >
              Sign Up Form
            </Box>
            {/* <div className="errorBox">* {sumbitErr}</div> */}
            {!!submitErr && <Alert severity="error">{submitErr}</Alert>}
            <TextField
              fullWidth
              error={nameError && nameError.length ? true : false}
              helperText={nameError}
              label="Username"
              sx={{ m: 1, color: "white" }}
              id="username"
              variant="outlined"
              required
              onChange={handleUserChange}
            />
            <TextField
              error={emailError && emailError.length ? true : false}
              helperText={emailError}
              fullWidth
              sx={{ m: 1 }}
              id="email"
              label="Email"
              variant="outlined"
              required
              onChange={handleEmailChange}
            />
            <TextField
              fullWidth
              error={passwordError && passwordError.length ? true : false}
              helperText={passwordError}
              sx={{ m: 1 }}
              id="password"
              type={showPassword ? "password" : "text"}
              label="Password "
              variant="outlined"
              required
              onChange={handlePasswordChange}
              InputProps={{
                // <-- This is where the toggle button is added.
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Progress size={progressPropsSize} rang={progressPropsColor} />
            <TextField
              fullWidth
              error={rpasswordError && rpasswordError.length ? true : false}
              helperText={rpasswordError}
              onChange={handleRpasswordChange}
              sx={{ m: 1 }}
              id="password"
              type={showPassword ? "password" : "text"}
              label="Repeat Password"
              variant="outlined"
              required
              InputProps={{
                // <-- This is where the toggle button is added.
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              fullWidth={true}
              onClick={formValidation}
              size="large"
              variant="contained"
              sx={{ mx: "auto", m: 1, fontWeight: 600 }}
            >
              Submit
            </Button>
          </form>
        </ThemeProvider>
      </div>
    </div>
  );
}

export default Register;
