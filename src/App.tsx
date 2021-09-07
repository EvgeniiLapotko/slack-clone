import React from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./componets/Header";
import Navbar from "./componets/Navbar";
import styled from "styled-components";
import Chat from "./componets/Chat";
import { onAuthStateChanged } from "firebase/auth";
import Login from "./componets/Login";
import { auth } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./features/appSlice";
import { selectUser } from "./features/appSlice";

const App: React.FC = (): React.ReactElement => {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);

    React.useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch(
                    setUser({
                        name: user.displayName,
                        userAvatar: user.photoURL,
                    })
                );
            } else {
                return;
            }
        });
    }, [dispatch]);

    return (
        <div className="App">
            <>
                {!user ? (
                    <>
                        <Login />
                    </>
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
            </>
        </div>
    );
};

const AppBody = styled.div`
    display: flex;
    height: 100vh;
`;

export default App;
