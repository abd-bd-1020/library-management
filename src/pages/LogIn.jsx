import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Link,
} from "@mui/material";
import DefaultService from "../services/DefaultService";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email || !password) {
      alert("Please fill in all fields.");
      return;
    }
    const payload = {
      email: email,
      password: password,
    };

    const response = await DefaultService.instance.login(payload);
    if (response.status === true) {
      const currentUserData = {
        email: email,
        role: response.data.role,
      };
      console.log(currentUserData);
      localStorage.setItem("currentUserData", JSON.stringify(currentUserData));
      window.location.href = "/homePage";
    } else {
      Swal.fire({
        title: "Error",
        text: "Please try again",
        icon: "error",
      });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <div
        style={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "100vh",
          justifyContent: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <form
          style={{ width: "100%", marginTop: 1 }}
          onSubmit={handleSubmit} // Attach handleSubmit to form onSubmit event
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ margin: "24px 0 16px" }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link
                href="#"
                variant="body2"
                onClick={() => {
                  navigate("/");
                }}
              >
                {"Login Later?"}
              </Link>
            </Grid>
            <Grid item>
              <Link
                href="#"
                variant="body2"
                onClick={() => {
                  navigate("/signup");
                }}
              >
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default LoginPage;
