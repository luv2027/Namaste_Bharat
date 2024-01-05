import Layout from './layouts/layout'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout></Layout>} />
        <Route path="/search" element={<>Search Page</>} />
        <Route path="*" element={<Navigate to="/" />}
        />
      </Routes>
    </Router>
  )
}

export default App
