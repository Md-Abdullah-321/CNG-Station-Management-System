import { NavLink } from 'react-router-dom';
import styled from "styled-components";

export const FlexContainer = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const FormContainer = styled.div`
    height: auto;
    width: 450px;
    background-color: #79AC78;
    border-radius: 5px;
    padding: 10px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`;


export const Form = styled.form`
    width: 100%;
    height: 100%;
    /* display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center; */
`;

export const Container = styled.div`
  width: 100%;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
`;

export const ErrorMessage = styled.div`
  font-size: 0.8rem;
  color: #D80032;
`;

export const TextInput = styled.input`
    outline: none;
    padding: 5px;
    border-radius: 5px;
    border: none;
`;

export const Heading = styled.h2`
    text-align: ${props => props.text || "center"};
    color: ${props => props.color || "#406343"};
    margin: ${props => props.margin || "10px 0px"};
    font-size:${props => props.font || "24px"};
    font-weight:${props => props.fontWeight || ""};
`

export const Label = styled.label`
    color: #406343;
`;


export const Button = styled.button`
    background-color: #C8E4B2;
    color: #406343;
    border: none;
    padding: ${props => props.padding || "5px 15px"};
    margin: ${props => props.margin || "0px"};
    border-radius: ${props => props.radius || "5px"};;
    cursor: pointer;
    font-weight: 600;
`

export const InputFile = styled.input`
    margin: 0.7rem 0rem 0rem 0.5rem;
`

export const P = styled.p`
    font-size:${props => props.font || "14px"};
    margin: ${props => props.margin || "0px 17px 0px 0px"};
    color:  ${props => props.color || ""};
`


//make hamburger button:
export const Line = styled.div`
    width: 15px;
    height: 2px;
    background-color: #C8E4B2;
    font-weight: 700;
`

export const Ul = styled.ul`
    display: flex;
    flex-direction: column;
    list-style-type: none;
    position: relative;
    top: 70px;
    left: 20px;
    gap: 0.5rem;
`
export const Li = styled.li`
    background-color: #79AC78;
    width: 80%;
    padding: 4px 10px;
    border-radius: 3px;
    transition: all 0.3s;
    cursor: pointer;
    &:hover {
         background-color: #C8E4B2;
    };
`

export const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: #fff;
  ${Li}:hover & {
        color: #406343;
    }
`;

export const Image = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 50%;
`

export const Span = styled.span`
    font-weight: 500;
`

export const SerialComponent = styled.div`
    background-color: rgb(67, 83, 52);
    padding: 10px;
    border-radius: 5px;
    margin: 0 10px 0 10px;
    color: #fff;
`

export const SerialDate = styled.h5`
    margin: 25px 0px 10px;
    width: 100px;
    font-size: 16px;
    font-weight: 400;
    background: #FAF1E4;
    padding: 3px 5px;
    border-radius: 20px;
    text-align: center;
`


export const Select = styled.select`
        width: 90%;
    padding: 3px 5px;
    border: none;
    border-radius: 5px;
    font-weight: 400;
    outline: none;
`





