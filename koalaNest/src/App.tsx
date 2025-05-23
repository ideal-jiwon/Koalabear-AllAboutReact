import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Layout from "./components/layout";
import Home from "./routes/home";
import Profile from "./routes/profile";
import CreateAccount from "./routes/create-account";
import Login from "./routes/login";
import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { useEffect, useState } from "react";
import LoadingScreen from "./components/loading-screen";
import { auth } from "./firebase";
import ProtectedRoute from "./components/protected-route";


const router = createBrowserRouter([
  {
    path:"/",
    element: <ProtectedRoute><Layout/></ProtectedRoute>,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "profile",
        element: <Profile />,
      }
    ]
  },
  {path:"/login", element:<Login />},
  {path:"/create-account", element:<CreateAccount />}
]);

const GlobalStyles = createGlobalStyle`
${reset};
*{
  box-sizing: border-box;
  }
body {
  background-color: black;
  color: white;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  -webkit-font-smoothing: antialiased;
}
`
const Wrapper = styled.div `
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;`;

function App() {
  const [isLoading ,setLoading] = useState(true);
  const init = async() => {
    await auth.authStateReady();
    setLoading(false);
  };
  useEffect(() => {
    init();
  }, []);
  return(
    <>
    <Wrapper>
    <GlobalStyles/>
    {isLoading ? <LoadingScreen /> : <RouterProvider router={router}/>}
    </Wrapper>
    </>
  );
}

export default App;
