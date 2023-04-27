import "./App.scss";
import { Container } from '@mui/material';
import { BrowserRouter } from "react-router-dom";
import { Router } from "./navigation/router";

function App() {
  return (
    <Container className="App">
        <BrowserRouter>
          <Router />
        </BrowserRouter>
    </Container>
  );
}

export default App;
