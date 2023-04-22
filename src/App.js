import { Home, Form, Submit, FormEdit } from "./pages";
import { Navbar } from "./components";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/form/:id" element={<Form />} />
        <Route exact path="/edit/form/:id" element={<FormEdit />} />
        <Route exact path="/submit/:id" element={<Submit />} />
      </Routes>
    </div>
  );
}

export default App;
