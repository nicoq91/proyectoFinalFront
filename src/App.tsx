import { Container } from '@mui/material';
import './App.css';
import Navbar from './components/Navbar';
import Products from './components/Products';
import Footer from './components/Footer';

function App() {
  return (
    <Container maxWidth='xl' className='custom-container'>
      <Navbar/>
      <Products/>
      <Footer/>
    </Container>
    
  );
}

export default App;
