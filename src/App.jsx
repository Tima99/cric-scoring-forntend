import "./App.css";
import { Routes, Route } from "react-router-dom";

// Layouts
import { EntryLayout, ViewMatchLayout } from "./Layouts";
// Features
import {
    LoginFeature,
    RegisterFeature,
    VerifyEmailFeature,
    CreateTeam,
    AddNewPlayerFeature,
} from "./Features";
// Pages
import {
    AddPlayerPage,
    HomePage,
    PreviewTeamPage,
    ScoringPage,
    StartMatchPage,
    TeamPage,
} from "./Pages";
import {
    PlayerRoleOutlet,
    ProfileOutlet,
    SearchOutlet,
    TeamOutlet,
    MatchOutlet,
    TeamMembersMultiSelectOutlet,
    TeamMembersOutlet,
    StartNextInning,
} from "./Outlets";
// Ui
import { MatchOver, SelectFielders, SelectStriker, Teams, Toss, ViewMatch1 } from "./Ui";
import { Confirm, NavHorizontal, Radios } from "./Components";
import { PlayingSquadOutlet } from "./Outlets/PlayingSquadOutlet";

function App() {
    return (
        <Routes>
            {/* Entry Routes */}
            <Route path="/" element={<EntryLayout />}>
                <Route index element={<RegisterFeature />} />
                <Route path="/login" element={<LoginFeature />} />
                <Route path="/:email/verify" element={<VerifyEmailFeature />} />
            </Route>

            {/* Home Page if user authenticated */}
            <Route path="/home" element={<HomePage />}>
                <Route index element={<ProfileOutlet />} />

                <Route path="/home/teams" element={<TeamOutlet />}>
                    <Route index element={<CreateTeam />} />
                    <Route path="/home/teams/:id" element={<Teams />} />
                </Route>

                <Route path={"/home/teams/matches"} element={<MatchOutlet />} />
            </Route>

            <Route path="/team/:id" element={<TeamPage />} />

            <Route path="/teamPreview" element={<PreviewTeamPage />}>
                <Route index element={<TeamMembersOutlet />} />
                <Route
                    path="/teamPreview/playerRole"
                    element={<PlayerRoleOutlet />}
                />
            </Route>

            <Route path="/addPlayer/:teamId" element={<AddPlayerPage />}>
                <Route
                    path="/addPlayer/:teamId/new"
                    element={<AddNewPlayerFeature />}
                />
                <Route
                    path="/addPlayer/:teamId/search"
                    element={<SearchOutlet />}
                />
            </Route>

            {/* Start Match*/}
            <Route path="/startMatch" element={<StartMatchPage />}>
                <Route
                    path="/startMatch/selectMyTeam/:id"
                    element={<Teams />}
                />
                <Route
                    path="/startMatch/searchOpponent"
                    element={<SearchOutlet />}
                />
                <Route path="/startMatch/select" element={<NavHorizontal />}>
                    <Route index element={<TeamMembersMultiSelectOutlet />} />
                    <Route
                        path="/startMatch/select/captain"
                        element={<TeamMembersOutlet />}
                    />
                    <Route
                        path="/startMatch/select/wicketkeeper"
                        element={<TeamMembersOutlet />}
                    />
                </Route>
                <Route path="/startMatch/toss" element={<Toss />}></Route>

                <Route
                    path="/startMatch/selectOpen"
                    element={<SelectStriker />}
                >
                    <Route
                        path="/startMatch/selectOpen/striker"
                        element={<TeamMembersOutlet />}
                    />
                </Route>
            </Route>

            {/* Scoring Page */}
            <Route path="/scoring" element={<ScoringPage />}>
                {/* <Route index  /> */}
                <Route path="/scoring/selectFielders" element={<SelectFielders />} >
                    <Route
                            path="/scoring/selectFielders/fielders"
                            element={<TeamMembersOutlet />}
                    />
                </Route>
                <Route path="/scoring/changeStrike" element={<Confirm />}></Route>
                <Route path="/scoring/selectNextPlayer" element={<TeamMembersOutlet />}></Route>
                <Route path="/scoring/nextInningConfirm" element={<StartNextInning />} />
                <Route
                    path="/scoring/selectOpen"
                    element={<SelectStriker />}
                >
                    <Route
                        path="/scoring/selectOpen/striker"
                        element={<TeamMembersOutlet />}
                    />
                </Route>
                <Route path="/scoring/matchOver" element={<MatchOver />}></Route>
            </Route>

            {/* Match View Page */}
            <Route path="/viewMatch" element={<ViewMatchLayout />}>
                <Route index element={<ViewMatch1 />} />
                {/* <Route path="/viewMatch/summary" element={<ViewMatchPage />} /> */}
                <Route path="/viewMatch/squad" element={<PlayingSquadOutlet />} ></Route>
            </Route>

        </Routes>
    );
}

export default App;
