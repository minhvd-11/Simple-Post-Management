import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import axios from "axios";
import App from "./App";

import {
  createPostMock,
  deletePostMock,
  getPostsMock,
  updatePostMock,
} from "./services/mocks/posts";

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
  await screen.findAllByTestId("card-post");
  act(() => {
    fireEvent.click(screen.getByTestId("btn-add-new-post"));
  });

  await screen.findByTestId("form-post");

  act(() => {
    fireEvent.click(screen.getByTestId("btn-submit-post-form"));
  });
  await screen.findByText("Please input the title!");

  //Assert
  expect(screen.getByText("Please input the title!")).toBeInTheDocument();
  expect(screen.getByText("Please input the description!")).toBeInTheDocument();
});

test("Display validation error when submitting post form with title that exceeds the maximum length (100)", async () => {
  // Arrange
  render(<App />);

  // Act
  await screen.findAllByTestId("card-post");
  act(() => {
    fireEvent.click(screen.getByTestId("btn-add-new-post"));
  });

  await screen.findByTestId("form-post");

  act(() => {
    fireEvent.change(screen.getByTestId("input-title"), {
      target: { value: "a".repeat(101) },
    });
  });

  await screen.findByText("The maximum length of title is 100!");

  // Assert
  expect(
    screen.getByText("The maximum length of title is 100!")
  ).toBeInTheDocument();
});

test("creates new post successfully", async () => {
  // Arrange
  mockedAxios.post.mockResolvedValue({
    data: createPostMock,
  });
  render(<App />);

  // Act
  await userEvent.click(screen.getByTestId("btn-add-new-post"));

  const titleInput = screen.getByTestId("input-title");
  const descriptionInput = screen.getByTestId("input-description");
  await userEvent.type(titleInput, "Dummy title");
  await userEvent.type(descriptionInput, "Dummy description");

  await userEvent.click(screen.getByTestId("btn-submit-post-form"));

  // Assert
 
});

test("updates post successfully", async () => {
  // Arrange
  mockedAxios.put.mockResolvedValue({
    data: updatePostMock,
  });
  render(<App />);

  // Act
  await screen.findAllByTestId("icon-edit-post");
  await userEvent.click(screen.getAllByTestId("icon-edit-post")[0]);

  const titleInput = screen.getByTestId("input-title");
  const descriptionInput = screen.getByTestId("input-description");
  await userEvent.type(titleInput, "Post 1 edit");
  await userEvent.type(descriptionInput, "This is post 1 edit");

  await userEvent.click(screen.getByTestId("btn-submit-post-form"));

  // Assert
  expect(screen.getByText("Update post successfully!")).toBeInTheDocument();
});

test("deletes post successfully", async () => {
  // Arrange
  mockedAxios.delete.mockResolvedValue({
    data: deletePostMock,
  });
  render(<App />);

  // Act
  await screen.findAllByTestId("icon-delete-post");
  await userEvent.click(screen.getAllByTestId("icon-delete-post")[0]);
  await userEvent.click(screen.getByTestId("btn-confirm-delete-post"));

  // Assert
  expect(screen.getByText("Delete post successfully!")).toBeInTheDocument();
});
