import './App.css'
import Home from './pages/Home'
import ProductDetail from './components/ProductDetail'
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
 

  return (
    <>
     <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/product/:id" element={<ProductDetail/>}/>
        <Route path="*" element={<div className='p-6'>Sayfa Bulunamadı..!</div>} />
      </Routes>
     
    </>
  )
}

export default App
