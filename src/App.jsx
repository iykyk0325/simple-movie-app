import { Routes, Route } from "react-router";
import Home from "./routes/Home";
import Detail from "./routes/Detail";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/movie/:id" element={<Detail />}></Route>
    </Routes>
  );
};

export default App;
