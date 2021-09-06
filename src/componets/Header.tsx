import React from "react";
import styled from "styled-components";

import TimeIcon from "@material-ui/icons/QueryBuilder";
import SearchIcon from "@material-ui/icons/Search";
import HelpIcon from "@material-ui/icons/HelpOutline";

import { Avatar } from "@material-ui/core";

const Header: React.FC = (): React.ReactElement => {
    return (
        <HeaderContainer>
            <HeaderUser>
                <HeaderAvatar></HeaderAvatar>
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
                    <HelpIcon />
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
`;
const HeaderSearh = styled.div`
    flex: 0.4;
    display: flex;
    align-items: center;
    padding: 5px 50px;
    background-color: #411f44;
    border: 1px solid gray;
    border-radius: 5px;

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
