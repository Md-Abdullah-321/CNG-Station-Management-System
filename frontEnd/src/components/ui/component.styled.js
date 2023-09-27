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
    text-align: center;
    color: #406343;
    margin: 10px 0px;
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
    font-size: 14px;
    margin-right: 17px;
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
    left: 10px;
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





