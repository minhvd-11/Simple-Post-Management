import "./App.css";
import PostCardList from "./components/PostCardList";
import AddButton from "./components/AddButton";
import Title from "./components/Title";

function App() {
  return (
    <>
      <Title title={"Post Management"}></Title>
      <AddButton />
      <>
        <PostCardList />
      </>
    </>
  );
}

export default App;
