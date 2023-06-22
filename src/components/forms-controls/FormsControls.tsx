import React, { ReactNode } from "react";
import classes from "./FormsControls.module.scss";
import clsx from "clsx";

export type TFormsControls = {
  input: any;
  meta: any;
  children: ReactNode;
};

export const FormsControls: React.FC<TFormsControls> = ({
  input,
  meta,
  ...props
}) => {
  const error = meta.touched && meta.error;
  return (
    <div className={clsx(classes["form-control"], { [classes.error]: error })}>
      <div {...input} {...props}>
        {props.children}
      </div>

      {error && <span>{meta.error}</span>}
    </div>
  );
};

export const Input: React.FC<TFormsControls> = ({ input, meta, ...props }) => {
  return <div {...props}>{props.children}</div>;
};
