import { act, fireEvent, render, screen, within } from "@testing-library/react";
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
})

mockedAxios.delete.mockResolvedValue({
  data: { message: "Post deleted successfully" },
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
  await screen.findAllByTestId("card-post");
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
  await screen.findAllByTestId("card-post")
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

  // Act
  await screen.findAllByTestId("card-post")
  act(() => {
    fireEvent.click(screen.getByTestId("btn-add-new-post"));
  });

  await screen.findByTestId("form-post");

  act(() => {
    fireEvent.change(screen.getByTestId("input-title"), { target: { value: addPostMock.title } });
    fireEvent.change(screen.getByTestId("input-description"), { target: { value: addPostMock.description } });
  });

  act(() => {
    fireEvent.click(screen.getByTestId("btn-submit-post-form"));
  });

  // Wait for the post to be created
  await screen.findByText("Add post successfully!");

  // Assert
  expect(screen.getByText("Add post successfully!")).toBeInTheDocument();
  expect(mockedAxios.post).toHaveBeenCalledTimes(1);
  expect(mockedAxios.post).toHaveBeenCalledWith("https://training-program.dev.tekoapis.net/api/v1/posts", {
    title: addPostMock.title,
    description: addPostMock.description,
  });
});

test("Delete a post successfully", async () => {
  // Arrange
  render(<App />);

  // Act
  await screen.findAllByTestId("card-post");

  // Get the first post card
  const firstPostCard = screen.getAllByTestId("card-post")[0];

  // Get the delete button of the first post card
  const deleteButton = within(firstPostCard).getByTestId("icon-delete-post");

  act(() => {
    fireEvent.click(deleteButton);
  });

  await screen.findByText("Delete Post");

  const confirmButton = screen.getByTestId('btn-confirm-delete-post');
  fireEvent.click(confirmButton);

  // Mock the axios delete method
  mockedAxios.delete.mockResolvedValue({
    data: { message: "Post deleted successfully" },
  });

  // Act
  act(() => {
    fireEvent.click(confirmButton);
  });

  // Wait for the post to be deleted
  await screen.findByText("Delete post successfully!");

  // Assert
  expect(screen.getByText("Delete post successfully!")).toBeInTheDocument();
  expect(mockedAxios.delete).toHaveBeenCalledTimes(1);
  expect(mockedAxios.delete).toHaveBeenCalledWith(`https://training-program.dev.tekoapis.net/api/v1/posts/${getPostsMock.posts[0].id}`);
});