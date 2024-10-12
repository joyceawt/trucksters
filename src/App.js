import { BrowserRouter, Routes, Route } from 'react-router-dom'

// components
import Nav from './components/Nav'
import Header from './components/Header'
import Footer from './components/Footer'

// Pages
import HomePage from './pages/HomePage'
import EmployeesPage from './pages/EmployeesPage'

function App() {
  const title = 'Trucksters'

  return (
    <div className='App'>
      <div className='container-fluid p-0'>
        <div className='d-flex min-vh-100'>
          <BrowserRouter>
            <Nav />
            <div className='p2 flex-grow-1 p-5 flex-column align-items-center justify-content-center'>
              <Header title={title} />

              <main className='custom-size'>
                <Routes>
                  <Route path='/' element={<HomePage />} />
                  <Route
                    path='/employees'
                    element={<EmployeesPage addEmployee={false} />}
                  />
                  <Route
                    path='/employees/add'
                    element={<EmployeesPage addEmployee={true} />}
                  />
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
