import { Link, resolvePath } from "react-router-dom";
import { ROUTES_URL } from "../../router";
import { IApiChild } from "../../types";
import { createDinamicUrlString } from "../../utils";
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
            <TableHeading scope="col">Detailed profile</TableHeading>
          </tr>
        </thead>
        <tbody>
          {children &&
            children.map((child, idx) => {
              return (
                <tr key={child.id}>
                  <TableData>{idx + 1}</TableData>
                  <TableData>{child.name}</TableData>
                  <TableData>{child.email}</TableData>
                  <TableData>
                    <Link
                      to={resolvePath(
                        createDinamicUrlString(ROUTES_URL.ChildDetailedInfo, {
                          id: child.id,
                        })
                      )}
                    >
                      Link
                    </Link>
                  </TableData>
                </tr>
              );
            })}
        </tbody>
      </StyledChildrenListingTable>
    </ChildrenListingTableWrapper>
  );
};
