import { act, fireEvent, render, screen } from "@testing-library/react";
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

mockedAxios.post.mockResolvedValue({
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
  await  screen.findByText("Please input the title!");

  //Assert
  expect(screen.getByText("Please input the title!")).toBeInTheDocument();
  expect(screen.getByText("Please input the description!")).toBeInTheDocument();
});

test("Display validation error when submitting post form with title that exceeds the maximum length (100)", async () => {
  // Arrange
  render(<App />);

  // Act
  act(() => {
    fireEvent.click(screen.getByTestId("btn-add-new-post"));
  });

  await screen.findByTestId("form-post");

  act(() => {
    fireEvent.change(screen.getByTestId("input-title"), { target: { value: "a".repeat(101) } });
  });

  await screen.findByText("The maximum length of title is 100!");

  // Assert
  expect(screen.getByText("The maximum length of title is 100!")).toBeInTheDocument();
});

test("Create new post successfully", async () => {
  // Arrange
  render(<App />);

  // Act
  act(() => {
    fireEvent.click(screen.getByTestId("btn-add-new-post"));
  });

  await screen.findByTestId("form-post");

  act(() => {
    fireEvent.change(screen.getByTestId("input-title"), { target: { value: "New Post Title" } });
    fireEvent.change(screen.getByTestId("input-description"), { target: { value: "New Post Description" } });
  });

  act(() => {
    fireEvent.click(screen.getByTestId("btn-submit-post-form"));
  });

  await screen.findAllByTestId("card-post");

  // Assert

  expect(mockedAxios.post).toHaveBeenCalledTimes(1);
  expect(mockedAxios.post).toHaveBeenCalledWith("/posts", {
    title: "New Post Title",
    description: "New Post Description",
  });
  expect(screen.getAllByTestId("card-post")).toHaveLength(getPostsMock.posts.length + 1);
});