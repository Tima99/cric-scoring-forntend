import './App.css'
import { Routes, Route, Outlet } from 'react-router-dom'

// Layouts
import { EntryLayout } from './Layouts'
// Features
import { LoginFeature, RegisterFeature, VerifyEmailFeature, CreateTeam } from './Features'
// Pages
import { HomePage, TeamPage } from './Pages'
import { ProfileOutlet, TeamOutlet } from './Outlets'
// Ui
import {Teams} from "./Ui"

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
        <Route path='/home/teams' element={<TeamOutlet />}>
          <Route index element={<CreateTeam />}/>
          <Route path='/home/teams/:id' element={<Teams />}/>
        </Route>
      </Route> 

      <Route path='/team/:id' element={<TeamPage />}>
        {/* <Route path='/team/:id/stats' element={<StatsOutlet />}/> */}
        {/* <Route />
        <Route /> */}
      </Route>
      
    </Routes>
  )
}

export default App
