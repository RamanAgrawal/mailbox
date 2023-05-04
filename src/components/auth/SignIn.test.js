import { render, screen } from "@testing-library/react";
import SignIn from "./SignIn";

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../store";
import userEvent from "@testing-library/user-event";

describe("Sign In", () => {
  test("Renders SignIn Form", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <SignIn />
        </BrowserRouter>
      </Provider>
    );
    const linkElement = screen.getByText("Sign In", { exact: true });
    expect(linkElement).toBeInTheDocument();
  });

  test("Not Renders SignUp Form", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <SignIn />
        </BrowserRouter>
      </Provider>
    );
    const linkElement = screen.queryByText("Sign Up");
    expect(linkElement).not.toBeInTheDocument();
  });

  test("Checking Button Click", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <SignIn />
        </BrowserRouter>
      </Provider>
    );
    // Act
    const buttonElement = screen.getAllByRole("button");
    userEvent.click(buttonElement[0]);

    // Assert
    const outputElement = screen.queryByText("Please Enter Correct Details!", {
      exact: false,
    });
    expect(outputElement).toBeNull();
  });
  test("Checking Button Click 2", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <SignIn />
        </BrowserRouter>
      </Provider>
    );
    // Act
    const buttonElement = screen.getAllByRole("button");
    userEvent.click(buttonElement[0]);

    // Assert
    const outputElement = screen.queryByText("Authentication Successful!", {
      exact: false,
    });
    expect(outputElement).toBeNull();
  });
});
