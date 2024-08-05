import { createContext } from "react";

interface PostContextValue {
  id: number;
  onUpdate: () => void;
}

export const PostContext = createContext<PostContextValue>({
  id: 0,
  onUpdate: () => {},
});