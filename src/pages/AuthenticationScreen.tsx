import React, { useEffect, useState } from "react";
import { TextField, Button, Typography, Grid, Paper } from "@mui/material";
import {
  saveDataToStorage,
  useAppDispatch,
  useAppSelector,
} from "../hooks/hooks";
import { RootState } from "../hooks/features/store/store";
import { useNavigate, useNavigation } from "react-router-dom";
import {
  DataBroswerName,
  DataFetchLinkList,
  websiteRouterList,
} from "../misc/BaseVariables";
import {
  fetchCurrentUserDataByToken,
  userLoginAsuncThunk,
} from "../hooks/features/slices/UserSlice";
import { userLoginType } from "../misc/User";

const AuthenticationScreen: React.FC = () => {
  const isLoggedIn = useAppSelector(
    (state: RootState) => state.authentication.loggedIn
  );

  const isOnError = useAppSelector(
    (state: RootState) => state.authentication.errorUser
  );

  const [isLoginForm, setIsLoginForm] = useState(true);
  const [loginData, setLoginData] = useState<userLoginType>({
    email: "",
    password: "",
  });

  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
    avatar: "",
  });
  const navigation = useNavigate();

  useEffect(() => {
    //if already login redirect to landing page
    if (isLoggedIn == true) {
      saveDataToStorage(DataBroswerName.isLoggedIn.keyName, isLoggedIn);
      navigation(websiteRouterList.home.shortLink);
    }

    if (isOnError) {
      console.log("isOnError", isOnError);
    }
  }, [isLoggedIn, isOnError]);

  const dispatch = useAppDispatch();

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleFormToggle = () => {
    setIsLoginForm(!isLoginForm);
  };

  /* const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Implement login logic
    console.log("Login Data:", loginData);
  }; */

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const url = DataFetchLinkList.authentication.login;
      const bodyData = {
        // Provide the necessary login credentials here
        email: loginData.email,
        password: loginData.password,
      };

      // Dispatch the async thunk with the url and bodyData
      dispatch(userLoginAsuncThunk({ url, bodyData }));
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Implement register logic
    console.log("Register Data:", registerData);
  };

  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12} sm={6}>
        <Paper elevation={3} sx={{ padding: 2 }}>
          <Typography variant="h5" gutterBottom>
            {isLoginForm ? "Login" : "Register"}
          </Typography>
          <form
            onSubmit={isLoginForm ? handleLoginSubmit : handleRegisterSubmit}
          >
            <TextField
              fullWidth
              margin="normal"
              label="email"
              name="email"
              type="email"
              value={isLoginForm ? loginData.email : registerData.email}
              onChange={isLoginForm ? handleLoginChange : handleRegisterChange}
            />
            {!isLoginForm && (
              <>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Username"
                  type="text"
                  name="username"
                  value={registerData.username}
                  onChange={handleRegisterChange}
                />

                <TextField
                  fullWidth
                  margin="normal"
                  label="Avatar link"
                  type="text"
                  name="avatar"
                  value={registerData.avatar}
                  onChange={handleRegisterChange}
                />
              </>
            )}
            <TextField
              fullWidth
              margin="normal"
              label="Password"
              type="password"
              name="password"
              value={isLoginForm ? loginData.password : registerData.password}
              onChange={isLoginForm ? handleLoginChange : handleRegisterChange}
            />
            <Button type="submit" variant="contained" color="primary">
              {isLoginForm ? "Login" : "Register"}
            </Button>
          </form>
          <Button
            onClick={handleFormToggle}
            variant="text"
            color="primary"
            sx={{ marginTop: 1 }}
          >
            {isLoginForm ? "Switch to Register" : "Switch to Login"}
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default AuthenticationScreen;
function dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}
