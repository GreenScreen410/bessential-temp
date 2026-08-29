import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Layout from './components/Layout'
import Home from './pages/Home'
import Idea from './pages/Idea'
import Report from './pages/Report'
import Bm from './pages/Bm'
import Market from './pages/Market'
import Metrics from './pages/Metrics'
import Roadmap from './pages/Roadmap'
import Risks from './pages/Risks'
import Grants from './pages/Grants'
import Prompts from './pages/Prompts'
import Pricing from './pages/Pricing'
import Faq from './pages/Faq'
import About from './pages/About'
import Login from './pages/Login'

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/idea', element: <Idea /> },
      { path: '/report', element: <Report /> },
      { path: '/bm', element: <Bm /> },
      { path: '/market', element: <Market /> },
      { path: '/metrics', element: <Metrics /> },
      { path: '/roadmap', element: <Roadmap /> },
      { path: '/risks', element: <Risks /> },
      { path: '/grants', element: <Grants /> },
      { path: '/prompts', element: <Prompts /> },
      { path: '/pricing', element: <Pricing /> },
      { path: '/faq', element: <Faq /> },
      { path: '/about', element: <About /> },
      { path: '/login', element: <Login /> },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
