import * as React from "react";
import { useState } from "react";

export interface FormElements extends HTMLFormControlsCollection {
  usernameInput: HTMLInputElement;
  password: HTMLInputElement;
}
interface UsernameFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

type TUsernameForm = {
  // usernameInput: HTMLInputElement;
  // password: HTMLInputElement;
};

const UsernameForm: React.FC<TUsernameForm> = ({}) => {
  const [username, setUsername] = useState<string>("");
  const onSubmitUsername = (username: string) => {
    setUsername(username);
  };
  const onSubmitPassword = (password: string) => {};
  function handleSubmit(event: React.FormEvent<UsernameFormElement>) {
    onSubmitUsername(event.currentTarget.elements.usernameInput.value);
    onSubmitPassword(event.currentTarget.elements.password.value);
    console.log(username);
  }
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="usernameInput">Username:</label>
        <input id="usernameInput" type="text" />
      </div>
      <div>
        <label htmlFor="password">Username:</label>
        <input id="password" type="text" />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default UsernameForm;
