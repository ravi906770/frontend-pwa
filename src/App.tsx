
import { useEffect, useState } from 'react';
import './App.css';
import Layout from './layout/Layout';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';


function App() {
  
  return (
    <>
    <Toaster/>
    <Layout/>
    </>
  );
}

export default App;
