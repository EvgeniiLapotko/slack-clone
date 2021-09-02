import React from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./componets/Header";
import Navbar from "./componets/Navbar";
import styled from "styled-components";

const App: React.FC = (): React.ReactElement => {
    return (
        <div className="App">
            <Header />

            <AppBody>
                <Navbar />
                <Switch>
                    <Route path="/" exact></Route>
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
