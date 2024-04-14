import { useState } from "react";

import styled from "styled-components";
import ToggleContent from "./ToggleContent";

export default function Toggle({ type, prop, open, children }) {
    const [isOpen, setIsOpen] = useState(open !== undefined ? open : false);

    const toggleHandler = () => {
        setIsOpen(!isOpen);
    }

    return (
        <>
            <Div onClick={toggleHandler} className={isOpen && "focused"}>{children}</Div>
            {isOpen && <ToggleContent type={type} prop={prop} />}
        </>
    );
}

const Div = styled.div`
box-sizing: border-box;
display: flex;
align-items: center;
padding: 12px 16px;
width: 100%;
height: 44px;
border-top: 1px solid #F1F1F5;
color: #767676;
&.focused{
    background-color: #f9f9f9;
    border-bottom: 1px solid #F1F1F5;
    color: #111111;
}
`