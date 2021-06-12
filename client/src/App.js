import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Footer } from './components/footer/Footer';
import { Header } from './components/headers/Header';
import { MainPages } from './components/mainpages/Pages';

function App() {
  const [isScroll, setIsScroll] = useState(false);
  return (
    <Router>
      <div className="App">
        <Header isScroll={isScroll} setIsScroll={setIsScroll} />
        <MainPages isScroll={isScroll} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
