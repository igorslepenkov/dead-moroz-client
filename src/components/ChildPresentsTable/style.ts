import styled from "styled-components";
import { DeleteIcon } from "../../assets";
import { Color, fonts, Media } from "../../ui";

export const StyledChildPresentsTable = styled.table`
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;

  ${Media.MD} {
    width: 90%;
  }
`;

export const TableHeading = styled.th`
  padding: 10px;
  border: 3px solid ${Color.PrimaryBorder};
  ${fonts.h3};
  color: ${Color.PrimaryMain};

  &:nth-child(1) {
    min-width: 10%;
    width: 50px;
  }

  &:nth-child(2) {
    min-width: 35%;
  }

  &:nth-child(3) {
    min-width: 40%;
  }

  &:nth-child(4) {
    min-width: 10%;
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
  max-width: 200px;
  max-height: 200px;
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

export const DeletePresentIcon = styled(DeleteIcon)`
  cursor: pointer;

  path {
    stroke: ${Color.DangerMain};
  }

  &:hover path {
    stroke: ${Color.DangerHover};
  }

  &:active path {
    stroke: ${Color.DangerPressed};
  }
`;

export const DeletePresentButton = styled.button`
  background-color: transparent;
  border: 3px solid transparent;
  border-radius: 4px;
  ${fonts.bodyTextLarge};
  color: ${Color.White};
  cursor: pointer;

  &:hover {
    background-color: ${Color.LightGray};
  }

  &:active {
    background-color: ${Color.IceGray};
  }
`;
