import React from "react";
import styled from "styled-components";

import TimeIcon from "@material-ui/icons/QueryBuilder";
import SearchIcon from "@material-ui/icons/Search";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import { Avatar } from "@material-ui/core";
import { useSelector } from "react-redux";
import { selectUser } from "../features/appSlice";
import { auth } from "../firebase";
import { deleteUser } from "firebase/auth";

interface IHeaderType {
    openMenu: () => void;
}

const Header: React.FC<IHeaderType> = ({
    openMenu,
}: IHeaderType): React.ReactElement => {
    const user = useSelector(selectUser);
    const toExit = () => {
        const userCurr = auth.currentUser;
        console.log(userCurr);

        if (userCurr) {
            deleteUser(userCurr)
                .then(() => {
                    console.log("delete");
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    return (
        <HeaderContainer>
            <HeaderUser>
                <HeaderAvatar
                    onClick={openMenu}
                    src={user?.userAvatar}
                ></HeaderAvatar>
                <HeaderIcon>
                    <TimeIcon />
                </HeaderIcon>
            </HeaderUser>
            <HeaderSearh>
                <SearchIcon />
                <input type="text" placeholder="Поиск..." />
            </HeaderSearh>
            <HeaderHelp>
                <HeaderHelpIcon>
                    <ExitToAppIcon onClick={toExit} />
                </HeaderHelpIcon>
            </HeaderHelp>
        </HeaderContainer>
    );
};

export default Header;

const HeaderContainer = styled.div`
    position: fixed;
    width: 100%;
    background-color: var(--color-slack);
    color: #fff;
    display: flex;
    align-items: center;
    padding: 13px;
    justify-content: space-between;
    z-index: 99;
`;
const HeaderUser = styled.div`
    display: flex;
    flex: 0.3;
    padding-right: 13px;
    align-items: center;
`;
const HeaderAvatar = styled(Avatar)`
    &.MuiAvatar-colorDefault {
        background-color: #9f4fa3;
    }
`;
const HeaderIcon = styled.div`
    margin-left: auto;
    @media (max-width: 580px) {
        display: none;
    }
`;
const HeaderSearh = styled.div`
    flex: 0.4;
    display: flex;
    align-items: center;
    padding: 5px 50px;
    background-color: #411f44;
    border: 1px solid gray;
    border-radius: 5px;
    @media (max-width: 580px) {
        max-width: 200px;
        padding: 5px 10px;
    }

    input {
        background-color: transparent;
        outline: none;
        min-width: 30vw;
        text-align: center;
        border: none;
        padding-left: 5px;
        padding-right: 5px;
        color: #fff;
        ::placeholder {
            color: rgba(255, 255, 255, 0.6);
        }
    }
`;
const HeaderHelp = styled.div`
    flex: 0.3;
    display: flex;
`;
const HeaderHelpIcon = styled.div`
    margin-left: auto;
`;
