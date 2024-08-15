import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import axios from "axios";
import App from "./App";

import { getPostsMock, addPostMock } from "./services/mocks/posts";

// Mock jest and set the type
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Provide the data object to be returned
mockedAxios.get.mockResolvedValue({
  data: getPostsMock,
});

mockedAxios.post.mockRejectedValue({
  data: addPostMock,
});

test("fetches and displays post data in post cards", async () => {
  // Arrange
  render(<App />);

  // Act
  await screen.findAllByTestId("card-post");

  // Assert
  expect(screen.getAllByTestId("card-post")).toHaveLength(
    getPostsMock.posts.length
  );
});

test("Display validation error when submitting post form with empty values", async () => {
  // Arrange
  render(<App />);

  //Act
  act(() => {
    fireEvent.click(screen.getByTestId("btn-add-new-post"));
  });

  await screen.findByTestId("form-post");

  act(() => {
    fireEvent.click(screen.getByTestId("btn-submit-post-form"));
  });
  await waitFor(() => screen.getByText("Please input the title!"));

  //Assert
  expect(screen.getByText("Please input the title!")).toBeInTheDocument();
  expect(screen.getByText("Please input the description!")).toBeInTheDocument();
});
