import styled from "styled-components";

export const FormBackgroundContainer = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #C8E4B2;
    font-family: 'Poppins', sans-serif;
`

export const ButtonFlexContainer = styled.div`
    width: 100%;
    margin: 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
`
export const DashboardContainer = styled.div`
    display: flex;
`
export const LeftContainer = styled.div`
    width: 20vw;
    height: 100vh;
    background-color: #FAF1E4;
`

export const RightContainer = styled.div`
    width: ${props => props.width ? "80vw": "100vw"};
    height: 100vh;
     background-color: #C8E4B2;
`
export const LineContainer = styled.div`
    position: fixed;
    top: 10px;
    left: 10px;
    display: flex;
    flex-direction: column;
    gap: 3px;
    background: #435334;
    padding: 8px 10px;
    border-radius: 3px;
    transition: 0.5s;
    cursor: pointer;
`