import './App.css'
import { Routes, Route, Outlet } from 'react-router-dom'

// Layouts
import { EntryLayout } from './Layouts'
// Features
import { LoginFeature, RegisterFeature, VerifyEmailFeature } from './Features'
// Pages
import { HomePage } from './Pages'
import { ProfileOutlet } from './Outlets/ProfileOutlet'

function App() {

  return (
    <Routes>
      {/* Entry Routes */}
      <Route path="/" element={<EntryLayout />}>
        <Route index element={<RegisterFeature />} />
        <Route path='/login' element={<LoginFeature />} />
        <Route path='/verify/:email' element={<VerifyEmailFeature />} />
      </Route>
      
      
      {/* Home Page if user authenticated */}
      <Route path='/home' element={<HomePage />}>
        <Route index element={<ProfileOutlet />}/>
      </Route> 
      
    </Routes>
  )
}

export default App
