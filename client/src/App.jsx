import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import CountryNews from './components/CountryNews';
import News from './components/News';
import TopHeadlines from './components/TopHeadlines'; 


export function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className="w-full">
      <BrowserRouter>
      <Header/>
       <Routes>
         <Route path="/" element={<News/>}/>
         <Route path="/top-headlines/:category" element={<TopHeadlines/>}/>
         <Route path="/country/:iso" element={<CountryNews/>}/>

       </Routes>
      </BrowserRouter>
    </div>
    </>
  );
}

export default App
