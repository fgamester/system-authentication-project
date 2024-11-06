import { createRoot } from 'react-dom/client'
import Layout from './Layout.jsx'
import { AppContext } from './context/GlobalContext.jsx'

createRoot(document.getElementById('root')).render(
  <AppContext>
    <Layout />
  </AppContext>
)
