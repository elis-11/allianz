import "./styles/App.scss";
import { useDataContext } from "./context/DataProvider";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Dashboard } from "./pages/Dashboard";
import { Navbar } from "./components/Navbar";
import { Admin } from "./pages/Admin";
import { ProtectedPage } from "./components/ProtectedPage";
import { Posts } from "./pages/Posts";
import { NotFound } from "./pages/NotFound";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h2>My Webpage (Template)</h2>
        <Navbar />
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
          <Route
            path="/posts"
            element={
              <ProtectedPage>
                <Posts />
              </ProtectedPage>
            }
          />
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
