import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home, Clientes, Filmes } from "pages";
import { LayoutApp } from "components";

import GlobalStyles from "styles/GlobalStyles";

function App() {
  return (
    <BrowserRouter>
      <LayoutApp>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Clientes" element={<Clientes />} />
          <Route path="/Filmes" element={<Filmes />} />
        </Routes>
      </LayoutApp>
      <GlobalStyles />
    </BrowserRouter>
  );
}

export default App;
