import { render, screen } from "@testing-library/react";
import SignUp from "./SignUp";

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../store";
import userEvent from "@testing-library/user-event";

describe("Sign Up", () => {
  test("Renders Signup Form", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <SignUp />
        </BrowserRouter>
      </Provider>
    );
    const linkElement = screen.getByText("Sign Up", { exact: true });
    expect(linkElement).toBeInTheDocument();
  });

  test("Not Renders Signin Form", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <SignUp />
        </BrowserRouter>
      </Provider>
    );
    const linkElement = screen.queryByText("Sign In");
    expect(linkElement).not.toBeInTheDocument();
  });

  test("Checking Button Click", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <SignUp />
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
          <SignUp />
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
