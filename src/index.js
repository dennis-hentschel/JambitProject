import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Navigation,
  Footer,
  Home,
  Week,
  Detail,
  Timeline,
} from "./components";

ReactDOM.render(
  <Router>
    <Navigation />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/week" element={<Week />} />
      <Route path="/timeline" element={<Timeline />} />
      <Route path="/detail" element={<Detail />}>
      </Route>
    </Routes>
    <Footer />
  </Router>,

  document.getElementById("root")
);

reportWebVitals();
