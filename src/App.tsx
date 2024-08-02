import AddPost from "./components/AddPost";
import ListPosts from "./components/ListPosts";

function App() {
  return (
    <main className="w-2/3 mx-auto">
      <ListPosts />
      <AddPost />
    </main>
  );
}

export default App;
