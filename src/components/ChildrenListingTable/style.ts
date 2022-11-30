import styled from "styled-components";
import { Color, fonts, Media } from "../../ui";

export const ChildrenListingTableWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledChildrenListingTable = styled.table`
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
`;

export const TableHeading = styled.th`
  padding: 10px;
  border: 3px solid ${Color.PrimaryBorder};
  ${fonts.h3};
  color: ${Color.PrimaryMain};

  &:nth-child(1) {
    width: 25px;
  }

  &:nth-child(4) {
    width: 75px;
  }

  &:nth-child(5) {
    width: 87px;
  }

  ${Media.SM} {
    &:nth-child(1) {
      width: 50px;
    }
    &:nth-child(4) {
      width: 90px;
    }
    &:nth-child(5) {
      width: 105px;
    }
  }

  ${Media.MD} {
    &:nth-child(1) {
      width: 40px;
    }
    &:nth-child(4) {
      width: 100px;
    }
    &:nth-child(5) {
      width: 120px;
    }
  }
`;

export const TableData = styled.td`
  padding: 10px;
  border: 3px solid ${Color.PrimaryBorder};
  ${fonts.bodyTextLarge};
  color: ${Color.PrimaryMain};
  text-align: center;

  word-break: break-all;
`;
