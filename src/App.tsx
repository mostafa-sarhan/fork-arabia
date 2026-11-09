import ComingSoon from './pages/ComingSoon'
import DesignSystem from './pages/DesignSystem'

function App() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/'

  if (path === '/design-system') {
    return <DesignSystem />
  }

  return <ComingSoon />
}

export default App
