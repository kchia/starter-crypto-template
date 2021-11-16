// Import REST API mocking utilities from the Mock Service Worker library
// Use msw to mock API calls that the tested component makes
import { rest } from "msw";
import { setupServer } from "msw/node";

// Import testing methods from the React Testing Library
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { MemoryRouter as Router, Route, Switch } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

import { Provider } from "react-redux";

import { store } from "../../../app/store";
import ProjectsList from "./index";
import testData from "./list.data.js";

const server = setupServer(
  // Intercept "GET http://localhost:3004/api/projects" requests
  rest.get("http://localhost:3004/api/projects", (request, response, ctx) => {
    // Respond using a mocked JSON body
    return response(ctx.json(testData));
  })
);

function renderWithRoutes() {
  render(
    <Provider store={store}>
      <Router initialEntries={["/projects"]}>
        <Switch>
          <Route exact path="/projects">
            <ErrorBoundary
              fallback={
                <section role="alert">
                  <h2>Something went wrong:</h2>
                </section>
              }
            >
              <ProjectsList />
            </ErrorBoundary>
          </Route>
          <Route path="/projects/:id">
            <ErrorBoundary
              fallback={
                <section role="alert">
                  <h2>Something went wrong:</h2>
                </section>
              }
            >
              <h2>Project view page</h2>
            </ErrorBoundary>
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}

xdescribe("ProjectsList", () => {
  // Set up API mocking before all tests
  beforeAll(() => server.listen());

  // Reset any request handlers after each test
  afterEach(() => server.resetHandlers());

  // Shut down the server once the tests are done
  afterAll(() => server.close());

  // For each test, follow the arrange-act-assert pattern
  test("displays the correct heading", async () => {
    // Arrange
    renderWithRoutes();

    // Act
    await waitFor(() => screen.getByRole("heading", { level: 2 })); // `waitFor` waits until the callback doesn't throw an error (i.e., until the h2 tag is rendered on the page).

    // Assert
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toHaveTextContent("Projects"); // Assert that the heading is correct using `toHaveTextContent()`
  });

  test("displays the correct table columns", async () => {
    // Arrange
    renderWithRoutes();

    // Act
    await waitFor(() => screen.getAllByRole("columnheader"));

    // Assert
    const columnHeaders = screen.getAllByRole("columnheader");
    const expected = ["#", "ICON", "NAME", "PRICE", "MCAP", "24H"];

    columnHeaders.forEach((columnHeader, index) => {
      expect(columnHeader).toHaveTextContent(expected[index]);
    });
  });

  test("displays 20 results", async () => {
    // Arrange
    renderWithRoutes();

    // Act
    await waitFor(() => screen.getByText("project"));

    // Assert
    const projectsRows = screen.getAllByRole("row");
    expect(projectsRows).toHaveLength(21); // including the column header row
  });

  test("routes to project view page on clicking a project icon", async () => {
    // Arrange
    renderWithRoutes();

    // Act
    await waitFor(() => screen.getByText("project"));
    await fireEvent.click(screen.getByAltText("project")); // simulate a click on the icon

    // Assert
    expect(screen.getByText(/project view page/i)).toBeInTheDocument();
  });

  test("routes to project view page on clicking a project name", async () => {
    // Arrange
    renderWithRoutes();

    // Act
    await waitFor(() => screen.getByText("project"));
    await fireEvent.click(screen.getAllByRole("link")[0]); // simulate a click on the name

    // Assert
    expect(screen.getByText("project view page")).toBeInTheDocument();
  });

  test("handles rendering error", async () => {
    // Arrange
    const spy = jest.spyOn(console, "error").mockImplementation(() => {}); // mute the console errors
    render(
      <Provider store={store}>
        <ProjectsList />
      </Provider>
    ); // rendering projectsList without wrapping it in a Router component will throw a rendering error

    // Act
    await waitFor(() => screen.getByRole("alert"));

    // Assert
    expect(screen.getByRole("alert")).toHaveTextContent(
      /Something went wrong/i
    );

    spy.mockRestore(); // restore console.error() to its original implementation
  });

  test("handles server error", async () => {
    // Arrange
    const spy = jest.spyOn(console, "error").mockImplementation(() => {}); // mute the console errors
    server.use(
      rest.get(
        "http://localhost:3004/api/projects",
        (request, response, ctx) => {
          return response(ctx.status(500));
        }
      )
    );
    renderWithRoutes();

    // Act
    await waitFor(() => screen.getByRole("alert"));

    // Assert
    expect(screen.getByRole("alert")).toHaveTextContent(
      /Something went wrong/i
    );

    spy.mockRestore(); // restore console.error() to its original implementation
  });
});
