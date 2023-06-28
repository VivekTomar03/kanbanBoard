
import { Box } from '@chakra-ui/react';
import './App.css';
import Allroutes from './Routes/Allroutes';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';

function App() {
  return (
    <Box className="App">
      <Navbar/>
      <Allroutes/>
      <Footer/>
    </Box>
  );
}

export default App;
