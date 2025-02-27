import { useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Combate from './pages/Combate/Combate';
import Contact from './pages/Contact/Contact';
import NotFound from './pages/NotFound/NotFound';

function App() {
  return (
    <div className='app'>
      <Header />
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/combate' element={<Combate />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/*' element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
