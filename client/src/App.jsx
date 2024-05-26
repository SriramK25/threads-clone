// UI LIBRARY
import { Container } from "@chakra-ui/react";

// UTILITY LIBRARY
import { Routes, Route, Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

// LOCAL FILES
import AuthPage from "./pages/AuthPage";
import ErrorPage from "./pages/ErrorPage";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import PostPage from "./pages/PostPage";
import UserProfileEdit from "./pages/UserProfileEdit";
import UserMenu from "./components/UserMenu";
import UserPage from "./pages/UserPage";
import { userAtom } from "./atoms/userAtom";

function App() {
  // LOCAL VARIABLE
  const user = useRecoilValue(userAtom);

  return (
    <Container maxW={"720px"}>
      <Header />
      <Routes>
        <Route
          path="/"
          element={user ? <HomePage /> : <Navigate to={"/auth"} />}
        />
        <Route path="/profile/:userId" element={<UserPage />} />
        <Route path="/profile/:userId/update" element={<UserProfileEdit />} />
        <Route path="/post/:postId" element={<PostPage />} />
        <Route
          path="/auth"
          element={!user ? <AuthPage /> : <Navigate to={"/"} />}
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      {user && <UserMenu />}
    </Container>
  );
}

export default App;
