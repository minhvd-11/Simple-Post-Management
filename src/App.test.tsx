import { act, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import axios from "axios";
import App from "./App";

import { getPostsMock } from "./services/mocks/posts";

// Mock jest and set the type
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Provide the data object to be returned
mockedAxios.get.mockResolvedValue({
  data: getPostsMock,
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

test("Create a new post successfully", async () => {
  // Arrange
  render(<App />);
  const newPostTitle = "New Post Title";
  const newPostDescription = "New Post Description";

  // Act
  act(() => {
    fireEvent.click(screen.getByTestId("btn-add-new-post"));
  });

  await screen.findByTestId("form-post");

  act(() => {
    fireEvent.change(screen.getByTestId("input-title"), { target: { value: newPostTitle } });
    fireEvent.change(screen.getByTestId("input-description"), { target: { value: newPostDescription } });
  });

  act(() => {
    fireEvent.click(screen.getByTestId("btn-submit-post-form"));
  });

  // Mock the POST request to return a successful response
  mockedAxios.post.mockResolvedValue({
    data: {
      id: 1,
      title: newPostTitle,
      description: newPostDescription,
    },
  });

  // Wait for the post to be created
  await screen.findByText("Add post successfully!");

  // Assert
  expect(screen.getByText("Add post successfully!")).toBeInTheDocument();
  expect(mockedAxios.post).toHaveBeenCalledTimes(1);
  expect(mockedAxios.post).toHaveBeenCalledWith("/posts", {
    title: newPostTitle,
    description: newPostDescription,
  });
});