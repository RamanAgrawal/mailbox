import App from "./App";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./components/store";

describe("App component", () => {
  test("renders learn react link", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );
    const linkElement = screen.queryByText("Welcome", { exact: false });
    expect(linkElement).not.toBeInTheDocument();
  });
});

class Employee {
  constructor(name, salary) {
    this.name = name;
    this.salary = salary;
  }
  static sortEmp(emp) {
    for (let i = 0; i < emp.length; i++)
      for (let j = 0; j < emp.length - i - 1; j++)
        if (emp[j].salary > emp[j + 1].salary) {
          let temp = emp[j];
          emp[j] = emp[j + 1];
          emp[j + 1] = temp;
        }
    for (let i = 0; i < emp.length; i++)
      console.log(`Name : ${emp[i].name}, Salary : ${emp[i].salary}`);
  }
}
const emp = [];
emp[0] = new Employee("John", 12000);
emp[1] = new Employee("Raj", 13000);
emp[2] = new Employee("Akash", 10000);
emp[3] = new Employee("Rio", 12500);
emp[4] = new Employee("Rony", 9000);
Employee.sortEmp(emp);
