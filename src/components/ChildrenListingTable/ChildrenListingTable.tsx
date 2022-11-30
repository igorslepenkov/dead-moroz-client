import { IApiChild } from "../../types";
import {
  ChildrenListingTableWrapper,
  StyledChildrenListingTable,
  TableData,
  TableHeading,
} from "./style";

interface IProps {
  children: IApiChild[];
}

export const ChildrenListingTable = ({ children }: IProps) => {
  return (
    <ChildrenListingTableWrapper>
      <StyledChildrenListingTable>
        <thead>
          <tr>
            <TableHeading scope="col">#</TableHeading>
            <TableHeading scope="col">Name</TableHeading>
            <TableHeading scope="col">Email</TableHeading>
            <TableHeading scope="col">Profile</TableHeading>
            <TableHeading scope="col">Wishlist</TableHeading>
          </tr>
        </thead>
        <tbody>
          {children &&
            children.map((child, idx) => {
              return (
                <tr>
                  <TableData>{idx + 1}</TableData>
                  <TableData>{child.name}</TableData>
                  <TableData>{child.email}</TableData>
                  <TableData>Profile</TableData>
                  <TableData>Wishlist</TableData>
                </tr>
              );
            })}
        </tbody>
      </StyledChildrenListingTable>
    </ChildrenListingTableWrapper>
  );
};
