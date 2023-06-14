import React, { FC } from "react";
import clsx from "clsx";
import classes from "../Auth.module.scss";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import CustomTextField from "../../../components/CustomTextField/CustomTextField";
import { NavLink } from "react-router-dom";

type TLoginProps = {
  handleFetchLogin: (
    email: string,
    password: string,
    rememberMe: boolean
  ) => void;
  isAuth: boolean;
};

const Login: React.FC<TLoginProps> = ({ handleFetchLogin }) => {
  type TLoginFields = {
    email: string;
    password: string;
    rememberMe: boolean;
  };
  const { handleSubmit, control, formState } = useForm<TLoginFields>({
    mode: "all",
    defaultValues: { email: "", password: "", rememberMe: false },
  });
  const onSubmit: SubmitHandler<TLoginFields> = (data) => {
    handleFetchLogin(data.email, data.password, data.rememberMe);
  };
  return (
    <>
      <div className={classes.title}>
        <h1>Welcome back</h1>
        <p>Please enter your details</p>
      </div>
      <div className={classes.body}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={clsx("input", classes.form)}>
            <Controller
              name="email"
              control={control}
              rules={{
                required: "Email is required",
                validate: {
                  hasCharsAfterAt: (value) =>
                    /.+./.test(value) || "Enter the email part before @",
                  hasAtChar: (value) =>
                    /.+@/.test(value) ||
                    "The email address must contain the @ symbol",
                  hasDotChar: (value) =>
                    /.+@.+\..+/i.test(value) || "Enter the email part after @",
                },
              }}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <CustomTextField
                  label="Email"
                  type="input"
                  error={!!error}
                  message={error?.message}
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                />
              )}
            />
          </div>{" "}
          <div className={clsx("input", classes.form)}>
            <Controller
              name="password"
              control={control}
              rules={{
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Minimum 6 symbols",
                },
              }}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <CustomTextField
                  label="Password"
                  type="password"
                  error={!!error}
                  message={error?.message}
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                />
              )}
            />
          </div>{" "}
          <div className={classes["remember-container"]}>
            <Controller
              name="rememberMe"
              control={control}
              render={({ field }) => (
                <div className="checkbox-remember">
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          onChange={(e) => field.onChange(e.target.checked)}
                          checked={field.value}
                        />
                      }
                      label="Remember me"
                    />
                  </FormGroup>
                </div>
              )}
            />
            <a href="#">Forget password?</a>
          </div>
          <button
            type="submit"
            disabled={!formState.isValid}
            className={classes.button}
          >
            Sign in
          </button>
        </form>
        <p className={classes.separator}>or</p>

        <NavLink to="/auth/registration" className={classes.link}>
          sign up
        </NavLink>
      </div>
    </>
  );
};

export default Login;
