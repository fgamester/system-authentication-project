import { BrowserRouter, Routes, Route } from 'react-router-dom'

function Layout() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/about" element={<h1>About</h1>} />
      </Routes>
    </BrowserRouter>)
}

export default Layout
