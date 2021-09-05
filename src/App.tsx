import React from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./componets/Header";
import Navbar from "./componets/Navbar";
import styled from "styled-components";
import Chat from "./componets/Chat";

const App: React.FC = (): React.ReactElement => {
    return (
        <div className="App">
            <Header />

            <AppBody>
                <Navbar />
                <Switch>
                    <Route path="/" exact>
                        <Chat />
                    </Route>
                </Switch>
            </AppBody>
        </div>
    );
};

const AppBody = styled.div`
    display: flex;
    height: 100vh;
`;

export default App;
