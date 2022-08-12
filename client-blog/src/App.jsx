import "./styles/App.scss";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Dashboard } from "./pages/Dashboard";
import { Navbar } from "./components/Navbar";
import { Admin } from "./pages/Admin";
import { ProtectedPage } from "./components/ProtectedPage";
import { NotFound } from "./pages/NotFound";
import { Posts } from "./components/posts/Posts";
import { PostDetails } from "./components/posts/PostDetails";
import { useDataContext } from "./context/DataProvider";

function App() {
  const {user, setUser} = useDataContext()
  return (
    <div className="App">
      <header className="App-header">
        <Navbar />
        <h2>Blog-Fullstack</h2>
      </header>
      {/* MAIN CONTENT / PAGE */}
      <main>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedPage>
                <Dashboard />
              </ProtectedPage>
            }
          />
          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route
            path="/admin/*"
            element={
              <ProtectedPage admin>
                <Admin />
              </ProtectedPage>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer>&copy; Eliza Studios Inc.</footer>
    </div>
  );
}

export default App;
