import React from "react";
import { render, fireEvent } from "@testing-library/react";
import SetGoals from "./SetGoals";
import { createServer } from "miragejs";
import { MemoryRouter } from "react-router-dom";
import Loading from "./Loading";

let server;

beforeEach(() => {
  server = createServer({
    routes() {
      this.logging = false;

      this.get("/api/books", (schema, request) => {
        return {
          books: [
            {
              title: "Hello, Darkness",
              author: "Sandra Brown",
              genre: "Fantasy",
              timestamp: "2019-11-15T11:13:34.915Z",
              pagecount: 100,
              id: 1,
            },
            {
              title: "Ella Enchanted",
              author: "Gail Carson Levine",
              genre: "Fantasy",
              timestamp: "2020-11-15T20:00:33.758Z",
              pagecount: 200,
              id: 2,
            },
            {
              title: "How to Win Friends & Influence People",
              author: "Dale Carnegie",
              genre: "Self Help",
              timestamp: "2020-02-15T20:20:40.368Z",
              pagecount: 300,
              id: 3,
            },
          ],
        };
      });

      this.get("/api/goals", (schema, request) => {
        return {
          goals: {
            books_this_year: 24,
            books_this_month: 2,
            pages_this_year: 6000,
            pages_this_month: 500,
          },
        };
      });
    },
  });
});

afterEach(() => {
  server.shutdown();
});

// all goal inputs exist (but are empty) before the get function called
test("rendering goal page", () => {
  const { container, getAllByTestId } = render(
    <MemoryRouter>
      <SetGoals />
    </MemoryRouter>
  );

  const inputs = container.getElementsByClassName("goal-input");

  expect(getAllByTestId("goal-input").length).toBe(4);

  // expect that there are four goal inputs
  expect(inputs[0].value).toBe("");
  expect(inputs[1].value).toBe("");
  expect(inputs[2].value).toBe("");
  expect(inputs[3].value).toBe("");
});

// changing input on goal page
test("changing books this year goal on goal page", () => {
  const { container, getAllByTestId } = render(
    <MemoryRouter>
      <SetGoals />
    </MemoryRouter>
  );

  const inputs = container.getElementsByClassName("goal-input");

  // await waitFor(() => expect(server.routes().get).toHaveBeenCalledTimes(1));
  expect(getAllByTestId("goal-input").length).toBe(4);

  // expect that there are four goal inputs
  const goals = getAllByTestId("goal-input");

  // click on the first goal input and type "5"
  fireEvent.click(goals[0]);
  fireEvent.change(inputs[0], { target: { value: "5" } });

  // expect that the value changes
  expect(inputs[0].value).toBe("5");
});

// changing input on goal page
test("changing books this month goal on goal page", () => {
  const { container, getAllByTestId } = render(
    <MemoryRouter>
      <SetGoals />
    </MemoryRouter>
  );

  const inputs = container.getElementsByClassName("goal-input");

  expect(getAllByTestId("goal-input").length).toBe(4);

  // expect that there are four goal inputs
  const goals = getAllByTestId("goal-input");

  // click on the first goal input and type "5"
  fireEvent.click(goals[1]);
  fireEvent.change(inputs[1], { target: { value: "99" } });

  // expect that the value changes
  expect(inputs[1].value).toBe("99");
});

// changing input on goal page
test("changing pages this year goal on goal page", () => {
  const { container, getAllByTestId } = render(
    <MemoryRouter>
      <SetGoals />
    </MemoryRouter>
  );

  const inputs = container.getElementsByClassName("goal-input");

  expect(getAllByTestId("goal-input").length).toBe(4);

  // expect that there are four goal inputs
  const goals = getAllByTestId("goal-input");

  // click on the first goal input and type "5"
  fireEvent.click(goals[2]);
  fireEvent.change(inputs[2], { target: { value: "6000" } });

  // expect that the value changes
  expect(inputs[2].value).toBe("6000");
});

// changing input on goal page
test("changing pages this month goal on goal page", () => {
  const { container, getAllByTestId } = render(
    <MemoryRouter>
      <SetGoals />
    </MemoryRouter>
  );

  const inputs = container.getElementsByClassName("goal-input");

  expect(getAllByTestId("goal-input").length).toBe(4);

  // expect that there are four goal inputs
  const goals = getAllByTestId("goal-input");

  // click on the first goal input and type "5"
  fireEvent.click(goals[3]);
  fireEvent.change(inputs[3], { target: { value: "500" } });

  // expect that the value changes
  expect(inputs[3].value).toBe("500");
});

//test("home page elements loaded", () => {});

// test the color of the loading element
test("loader color", () => {
  const { getAllByTestId } = render(
    <MemoryRouter>
      <Loading color={"red"} />
    </MemoryRouter>
  );

  const loading = getAllByTestId("loader");
  expect(loading[0]).toHaveStyle("color: red");
});
