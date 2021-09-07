import { signInWithPopup } from "@firebase/auth";
import { Button } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";

import styled from "styled-components";
import slackIcon from "../assets/img/icon_slack.png";
import { setUser } from "../features/appSlice";
import { auth, provider } from "../firebase";

function Login() {
    const dispatch = useDispatch();
    const user = auth.currentUser;
    console.log(user);
    const signIn = (e: React.SyntheticEvent) => {
        e.preventDefault();
        signInWithPopup(auth, provider);

        if (user) {
            dispatch(
                setUser({
                    name: user.displayName,
                    userAvatar: user.photoURL,
                })
            );
        }
    };

    return (
        <LoginContainer>
            <LoginInner>
                <LoginItemImg>
                    <img src={slackIcon} alt="icon-slack" />
                    <h1>Sign In</h1>

                    <Button
                        color="primary"
                        variant="contained"
                        onClick={signIn}
                    >
                        Sign In with Google
                    </Button>
                </LoginItemImg>
            </LoginInner>
        </LoginContainer>
    );
}

export default Login;

const LoginContainer = styled.div`
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgb(235, 236, 237);
`;
const LoginInner = styled.div`
    background-color: #fff;
    padding: 100px;
    border-radius: 15px;
    min-width: 30%;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    button {
        background-color: #0a8d48 !important;
        margin-top: 40px;
    }
`;
const LoginItemImg = styled.div`
    text-align: center;
    img {
        width: 100px;
        height: 100px;
    }
`;
