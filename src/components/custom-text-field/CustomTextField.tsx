import { TextField } from "@mui/material";
import React from "react";
import classes from "./CustomTextField.module.scss";

type TCustomTextFieldProps = {
  className?: string;
  label: string;
  type: "input" | "password";
  message?: string;
  error?: boolean;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
};
const CustomTextField: React.FC<TCustomTextFieldProps> = ({
  className,
  label,
  message,
  error,
  value,
  type,
  onChange,
  onBlur,
}) => {
  return (
    <div className={classes.wrapper}>
      <div className={className}>
        {type === "input" ? (
          <TextField
            variant="standard"
            label={label}
            error={error}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            autoFocus={false}
            multiline={false}
          />
        ) : (
          <TextField
            label={label}
            type="password"
            variant="standard"
            error={error}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            autoFocus={false}
            multiline={false}
          />
        )}
        {message && (
          <div className={classes["helper-text"]}>
            <div />
            <div>
              <p>{message}</p>
            </div>
            <div />
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomTextField;
