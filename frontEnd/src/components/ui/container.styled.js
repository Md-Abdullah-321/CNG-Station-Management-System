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
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    
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
export const PageContainer = styled.div`
    padding: 50px;
`

export const ProfileContainer = styled.div`
    display: flex;
    justify-content: ${props => props.justify || "center"};
    align-items: ${props => props.items || "center"};
    flex-direction: column;
    width: 100%;
    height: 85vh;
`

export const ProfileContentContainer = styled.div`
    background-color: #435334;
    color: #fff;
    width: ${props => props.width || "80%"};
    height: ${props => props.height || "70%"};
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    padding: ${props => props.padding || "50px"};
    opacity: 0.5;
`
export const CenterElementContainer = styled.div`
    text-align: center;
    width: 100%;
    margin-top: 10px;
`

export const ProfileDescriptionContainer = styled.div`
    width: 80%;
    height: 60%;
    padding: 10px;
    margin: 30px auto 0 auto;
    line-height: 1.5rem;
`
export const SerialHistoryContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
`

export const FlexColumn = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    align-items: center;
    height: 80%;
    gap: 10px;
`

export const SerialContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    width: 100%;
    color: #fff;
`

export const Serial = styled.div`
    background-color: #435334;
    margin: 5px;
    padding: 10px;
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`
