import React from "react";
import styled from "styled-components";

import CreateIcon from "@material-ui/icons/Create";
import FiberIcon from "@material-ui/icons/FiberManualRecord";
import CommentIcon from "@material-ui/icons/Comment";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import MarkIcon from "@material-ui/icons/BookmarkBorder";
import PeopleIcon from "@material-ui/icons/SupervisorAccount";
import AppsIcon from "@material-ui/icons/Apps";
import FileIcon from "@material-ui/icons/FileCopy";
import ArrowLessIcon from "@material-ui/icons/ExpandLess";
import ArrowMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
import NavbarList from "./NavbarList";

import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../firebase";

interface IchanelType {
    chanel: string;
    id: string;
}

const Navbar: React.FC = (): React.ReactElement => {
    const [chanelsList, setChanels] = React.useState<IchanelType[]>([]);

    const fetchChanel = async () => {
        const querySnapshot = await getDocs(query(collection(db, "/rooms")));
        const chanels: IchanelType[] = [];
        querySnapshot.forEach((doc) => {
            chanels.push({ id: doc.id, chanel: doc.data().name });
            // console.log(doc.id, " => ", doc.data());
            setChanels(chanels);
        });
    };
    React.useEffect(() => {
        fetchChanel();
    }, []);
    console.log(chanelsList);
    return (
        <NavbarContainer>
            <NavbarHeader>
                <NavbarInfo>
                    <h2>NickName</h2>
                    <h3>
                        <FiberIcon />
                        John Doo
                    </h3>
                </NavbarInfo>
                <NavbarHeaderIcon>
                    <CreateIcon />
                </NavbarHeaderIcon>
            </NavbarHeader>
            <NavbarList title={"Популярные"} Icon={CommentIcon} />
            <NavbarList title={"Упоминания & реакции"} Icon={InboxIcon} />
            <NavbarList title={"Сохраненные"} Icon={DraftsIcon} />
            <NavbarList title={"Каналы"} Icon={MarkIcon} />
            <NavbarList title={"Люди & группы"} Icon={PeopleIcon} />
            <NavbarList title={"Приложения"} Icon={AppsIcon} />
            <NavbarList title={"Файлы"} Icon={FileIcon} />
            <NavbarList title={"Скрыть"} Icon={ArrowLessIcon} />
            <hr />
            <NavbarList title={"Каналы"} Icon={ArrowMoreIcon} />
            <hr />
            <NavbarList
                title={"Добавить канал"}
                Icon={AddIcon}
                addChanelOption
            />
            {chanelsList &&
                chanelsList.map((item) => (
                    <NavbarList
                        key={item.id}
                        title={item.chanel}
                        id={item.id}
                    />
                ))}
        </NavbarContainer>
    );
};

export default Navbar;

const NavbarContainer = styled.div`
    flex: 0.3;
    max-width: 280px;
    background-color: var(--color-slack);
    color: #fff;
    border-top: 1px solid #49274b;
    hr {
        margin: 0 5px;

        opacity: 0.3;
        border-color: #49274b;
    }
`;

const NavbarHeader = styled.div`
    display: flex;
    border-bottom: 1px solid #49274b;
    padding: 13px;
    align-items: center;
    margin-bottom: 5px;
`;
const NavbarInfo = styled.div`
    h2 {
        margin: 0;
        font-size: 15px;
        letter-spacing: 1px;
    }
    h3 {
        margin: 0;
        font-size: 13px;
        font-weight: 400;
        letter-spacing: 1px;
        .MuiSvgIcon-root {
            font-size: 12px;
            color: green;
            margin-right: 7px;
        }
    }
`;
const NavbarHeaderIcon = styled.div`
    margin-left: auto;
    background-color: #fff;
    width: 35px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    opacity: 0.8;
    transition: all 0.3;
    .MuiSvgIcon-root {
        color: var(--color-slack);
    }
    :hover {
        opacity: 1;
    }
`;
