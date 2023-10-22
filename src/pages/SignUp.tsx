import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import * as yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useAppDispatch } from "../hooks/useAppDispatch";
import CreateUserDto from "../types/user/RegisterUserRequest";
import {
    checkEmailIsAvailable,
    registerUserAsync,
} from "../redux/reducers/userReducer";
interface FormInput {
    name: string;
    email: string;
    password: string;
    confirmedPassword: string;
}

const signUp = yup
    .object({
        name: yup.string().required(),
        email: yup.string().required(),
        password: yup.string().min(8).max(20).required(),
        confirmedPassword: yup
            .string()
            .oneOf([yup.ref("password")])
            .required(),
    })
    .required();

export const SignUp = () => {
    const dispatch = useAppDispatch();

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(signUp),
    });

    const onSubmit: SubmitHandler<FormInput> = (data) => {
        const { confirmedPassword, ...newData } = Object.assign({}, data);

        const newUser: CreateUserDto = {
            ...newData,
            avatar: "https://i.imgur.com/OLKMwgP.jpeg",
        };
        console.log(newUser);
        dispatch(registerUserAsync(newUser));
        reset();
    };

    dispatch(checkEmailIsAvailable("thisisanavailable@mail.com"));

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
                    sx={{ mt: 3 }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id="user"
                                label="User"
                                autoComplete="user-name"
                                error={Boolean(errors.name?.message)}
                                helperText={errors.name?.message}
                                {...register("name")}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id="email"
                                label="Email Address"
                                error={Boolean(errors.email?.message)}
                                helperText={errors.email?.message}
                                {...register("email")}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Password"
                                type="password"
                                id="password"
                                error={Boolean(errors.password?.message)}
                                helperText={errors.password?.message}
                                autoComplete="new-password"
                                {...register("password")}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Confirm Password"
                                type="password"
                                error={Boolean(
                                    errors.confirmedPassword?.message
                                )}
                                helperText={errors.confirmedPassword?.message}
                                autoComplete="confirm-password"
                                {...register("confirmedPassword")}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        value="allowExtraEmails"
                                        color="primary"
                                    />
                                }
                                label="I want to receive inspiration, marketing promotions and updates via email."
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="login" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};
