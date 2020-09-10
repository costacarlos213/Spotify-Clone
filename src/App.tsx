import React from 'react';
import './assets/styles/global.css'
import Routes from './routes'
import Footer from './components/Footer';


const App: React.FC = () => {
  return (
    <>
      <Routes />
      <Footer currentMusicIndex={0}/>
    </>
  );
}

export default App;
