import styled from "styled-components";
import { Color, fonts } from "../../ui";

export const StyledChildPresentsTable = styled.table`
  width: 80%;
  table-layout: fixed;
  border-collapse: collapse;
`;

export const TableHeading = styled.th`
  padding: 10px;
  border: 3px solid ${Color.PrimaryBorder};
  ${fonts.h3};
  color: ${Color.PrimaryMain};

  &:nth-child(1) {
    width: 10%;
  }

  &:nth-child(2) {
    width: 60%;
  }

  &:nth-child(3) {
    width: 30%;
  }
`;

export const TableData = styled.td`
  padding: 10px;
  border: 3px solid ${Color.PrimaryBorder};
  ${fonts.bodyTextLarge};
  color: ${Color.PrimaryMain};
  text-align: center;
`;

export const PresentImage = styled.img`
  width: 100%;
  height: 100%;
`;

export const AddPresentButton = styled.button`
  padding: 8px 16px;
  background-color: ${Color.PrimaryMain};
  border: 3px solid transparent;
  border-radius: 4px;
  ${fonts.bodyTextLarge};
  color: ${Color.White};
  cursor: pointer;

  &:hover {
    background-color: ${Color.PrimaryHover};
  }

  &:active {
    background-color: ${Color.PrimaryPressed};
  }

  &:focus {
    border: 3px solid ${Color.PrimaryFocused};
  }
`;
