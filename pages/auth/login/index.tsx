import {
  Button,
  Grid2,
  Paper,
  TextField,
  Typography,
  Avatar,
  Box,
  IconButton,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { loginMutation } from "@/customHooks/query/auth.query.hooks";
import { loginProps } from "@/typeScript/auth.interface";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import Link from "next/link";

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<loginProps>();

  const router = useRouter();
  const { mutate, isPending } = loginMutation();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onsubmit = async (formData: FieldValues) => {
    const { email, password } = formData as { email: string; password: string };
    const formdata = new FormData();
    formdata.append("email", email);
    formdata.append("password", password);

    //   mutate(formData, {});
    //   console.log(formData);
    //   reset();
    //   router.push("/cms/list");
    // };
    // const handleLoginError = () => {
    //   router.push("/auth/registration");
    // };

    mutate(
      { email, password },
      {
        onSuccess: (data: any) => {
          if (data?.status === 200 && data?.token) {
            localStorage.setItem("user", JSON.stringify(data.user));
            setTimeout(() => {
              window.location.href = "/cms/list";
            }, 100);
          } else {
            router.push("/auth/registration");
          }
        },
        onError: (error) => {
          router.push("/auth/registration");
        },
      }
    );

    reset();
  };

  return (
    <>
      <Grid2
        container
        justifyContent="center"
        alignItems="center"
        style={{
          minHeight: "100vh",
          // background: "#EDC7B7",
        }}
      >
        <Paper
          elevation={10}
          style={{
            padding: 30,
            width: 350,
            borderRadius: 15,
            background: "#fff",
            // background:"transparent",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.8)",
          }}
        >
          <Box textAlign="center">
            <Avatar style={{ background: "#5d4037", margin: "0 auto" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography
              variant="h5"
              style={{ margin: "20px 0", color: "#AC3B61", fontWeight: "bold" }}
            >
              Sign In
            </Typography>
          </Box>

          <form onSubmit={handleSubmit(onsubmit)}>
            <TextField
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Invalid email format",
                },
              })}
              label="Email"
              placeholder="Enter email"
              fullWidth
              margin="normal"
              error={!!errors.email}
              helperText={errors.email && errors.email.message}
            />

            <Box sx={{ position: "relative", width: "100%" }}>
              <TextField
                {...register("password", { required: "Password is required" })}
                label="Password"
                type={showPassword ? "text" : "password"}
                fullWidth
                margin="normal"
                error={!!errors.password}
                helperText={errors.password?.message}
              />
              <IconButton
                onClick={togglePasswordVisibility}
                sx={{
                  position: "absolute",
                  right: 10,
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </Box>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              style={{
                margin: "20px 0",
                background: "#123C69",
                color: "#fff",
                fontWeight: "bold",
              }}
              disabled={isPending}
              startIcon={
                isPending ? (
                  <RotateLeftIcon
                    sx={{ animation: "spin 1s linear infinite" }}
                  />
                ) : null
              }
            >
              {isPending ? "Loading..." : "Login"}
            </Button>

            <Typography
              align="center"
              sx={{  fontWeight: "bold" }}
            >
              Don't have an account?
              <Link
                href="/auth/registration"
                passHref
                style={{
                  color: "#AC3B61",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
                Sign Up
              </Link>
            </Typography>
          </form>
        </Paper>
      </Grid2>
    </>
  );
};

export default Login;
