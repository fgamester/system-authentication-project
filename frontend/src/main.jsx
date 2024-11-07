import { createRoot } from 'react-dom/client'
import Layout from './Layout.jsx'
import { AppContext } from './context/GlobalContext.jsx'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import './styles/main.css';

createRoot(document.getElementById('root')).render(
  <AppContext>
    <Layout />
  </AppContext>
)
