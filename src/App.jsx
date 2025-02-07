import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SeminarPage from './pages/SeminarPage';
const App = () => {

  return (
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<SeminarPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
