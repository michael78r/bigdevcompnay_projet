import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createRoot } from "react-dom/client";
import View_filtrage from "./view/view_filtrage";
import Info_Joueur from "./view/info_joueur";
import Info_Club from "./view/info_club";
import Info_National from "./view/info_national";


function Main() {
    return (
        <Router>
            <Routes>
                <Route exact path="/joueur_liste" element={<Info_Joueur />} />
                <Route exact path="/filtrage" element={<View_filtrage />} />
                <Route exact path="/club" element={<Info_Club />} />
                <Route exact path="/national" element={<Info_National />} />
            </Routes>
        </Router>
    );
}

export default Main;

const container = document.getElementById("app");
const root = createRoot(container);
root.render(
    <React.StrictMode>
        <Main />
    </React.StrictMode>
)
