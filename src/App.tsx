import React from "react";
import { Switch, Route } from "react-router-dom";
import "./loader/loader.scss";
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
    const [loading, setLoading] = React.useState<boolean>(true);

    const [openMenu, setOpenMenu] = React.useState<boolean>(false);
    const handleOpenMenu = () => {
        setOpenMenu(!openMenu);
    };
    if (!user) {
        setTimeout(() => {
            setLoading(false);
        }, 3500);
    }
    React.useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch(
                    setUser({
                        name: user.displayName,
                        userAvatar: user.photoURL,
                        nikName: "Anonimys",
                    })
                );
            } else {
                return;
            }
        });
    }, [dispatch]);

    return (
        <>
            {loading ? (
                <LoaderContainer>
                    <div className="lds-grid">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </LoaderContainer>
            ) : (
                <AppWrapper>
                    <>
                        {!user ? (
                            <>
                                <Login />
                            </>
                        ) : (
                            <>
                                <Header openMenu={handleOpenMenu} />
                                <AppBody>
                                    <Navbar menu={openMenu} />
                                    <Switch>
                                        <Route path="/" exact>
                                            <Chat />
                                        </Route>
                                    </Switch>
                                </AppBody>
                            </>
                        )}
                    </>
                </AppWrapper>
            )}
        </>
    );
};

export default App;

const AppWrapper = styled.div`
    height: 100vh;
    position: relative;
`;
const AppBody = styled.div`
    display: flex;
    height: 100vh;
`;
const LoaderContainer = styled.div`
    display: flex;
    height: 100vh;
    align-items: center;
    justify-content: center;
`;
