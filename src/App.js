import { BrowserRouter, Routes, Route } from 'react-router-dom'

// components
import Nav from './components/Nav'
import Header from './components/Header'
import Footer from './components/Footer'

// Pages
import HomePage from './pages/HomePage'

function App() {
  const title = 'Trucksters'

  return (
    <div className='App'>
      <div className='container-fluid p-0'>
        <div className='d-flex min-vh-100'>
          <BrowserRouter>
            <Nav />
            <div className='p2 flex-grow-1 ps-5 flex-column align-items-center justify-content-center'>
              <Header title={title} />

              <main className='custom-size'>
                <Routes>
                  <Route path='/' element={<HomePage />} />
                </Routes>
                <Footer />
              </main>
            </div>
          </BrowserRouter>
        </div>
      </div>
    </div>
  )
}

export default App
