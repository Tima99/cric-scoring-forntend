import './App.css'
import { Routes, Route, Outlet } from 'react-router-dom'

// Layouts
import { EntryLayout } from './Layouts'
// Features
import { LoginFeature, RegisterFeature, VerifyEmailFeature, CreateTeam, AddNewPlayerFeature } from './Features'
// Pages
import { AddPlayerPage, HomePage, PreviewTeamPage, TeamPage } from './Pages'
import { PlayerRoleOutlet, ProfileOutlet, SearchOutlet, TeamOutlet } from './Outlets'
// Ui
import { Teams } from "./Ui"

function App() {

  return (
    <Routes>
      {/* Entry Routes */}
      <Route path="/" element={<EntryLayout />}>
        <Route index element={<RegisterFeature />} />
        <Route path='/login' element={<LoginFeature />} />
        <Route path='/:email/verify' element={<VerifyEmailFeature />} />
      </Route>


      {/* Home Page if user authenticated */}
      <Route path='/home' element={<HomePage />}>
        <Route index element={<ProfileOutlet />} />
        <Route path='/home/teams' element={<TeamOutlet />}>
          <Route index element={<CreateTeam />} />
          <Route path='/home/teams/:id' element={<Teams />} />
        </Route>
      </Route>

      <Route path='/team/:id' element={<TeamPage />} />

      <Route path="/teamPreview" element={<PreviewTeamPage />} >
        <Route path='/teamPreview/playerRole' element={<PlayerRoleOutlet />}/>
      </ Route>

      <Route path='/addPlayer/:teamId' element={<AddPlayerPage />} >
        <Route path='/addPlayer/:teamId/new' element={<AddNewPlayerFeature />} />
        <Route path='/addPlayer/:teamId/search' element={<SearchOutlet />} />
      </Route>

    </Routes>
  )
}

export default App
