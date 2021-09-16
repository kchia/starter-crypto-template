// Import REST API mocking utilities from the Mock Service Worker library
// Use msw to mock API calls that the tested component makes
import { rest } from "msw";
import { setupServer } from "msw/node";

// Import testing methods from the React Testing Library
import { render, screen, waitFor } from "@testing-library/react";

import CoinsList from "./index";
import testData from "./list.data.js";

const server = setupServer(
  // Intercept "GET http://localhost:3004/api/coins" requests
  rest.get("http://localhost:3004/api/coins", (request, response, ctx) => {
    // Respond using a mocked JSON body
    return response(ctx.json(testData));
  })
);

describe("CoinsList", () => {
  // Set up API mocking before all tests
  beforeAll(() => server.listen());

  // Reset any request handlers after each test
  afterEach(() => server.resetHandlers());

  // Shut down the server once the tests are done
  afterAll(() => server.close());

  // For each test, follow the arrange-act-assert pattern
  test("displays the correct heading", async () => {
    // Arrange
    render(<CoinsList />); // The render method renders a React element into the DOM.

    // Act
    await waitFor(() => screen.getByRole("heading", { level: 2 })); // `waitFor` waits until the callback doesn't throw an error (i.e., until the h2 tag is rendered on the page).

    // Assert
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toHaveTextContent("Top 20 Coins by Market Cap"); // Assert that the heading is correct using `toHaveTextContent()`
  });

  test("displays the correct table columns", async () => {
    // Arrange
    render(<CoinsList />);

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
    render(<CoinsList />);

    // Act
    await waitFor(() => screen.getByText("Bitcoin"));

    // Assert
    const coinsRows = screen.getAllByRole("row");
    expect(coinsRows).toHaveLength(21); // including the column header row
  });
});
