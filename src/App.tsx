import React from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./componets/Header";
import Navbar from "./componets/Navbar";
import styled from "styled-components";
import Chat from "./componets/Chat";

import Login from "./componets/Login";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { setUser } from "./features/appSlice";

const App: React.FC = (): React.ReactElement => {
    const user = auth.currentUser;
    console.log(user);
    const dispatch = useDispatch();

    React.useEffect(() => {
        if (user) {
            dispatch(
                setUser({ name: user.displayName, userAvatar: user.photoURL })
            );
        }
    }, [user, dispatch]);
    return (
        <div className="App">
            {!user ? (
                <Login />
            ) : (
                <>
                    <Header />
                    <AppBody>
                        <Navbar />
                        <Switch>
                            <Route path="/" exact>
                                <Chat />
                            </Route>
                        </Switch>
                    </AppBody>
                </>
            )}
        </div>
    );
};

const AppBody = styled.div`
    display: flex;
    height: 100vh;
`;

export default App;
