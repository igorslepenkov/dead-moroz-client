import {
  FormControlLabel,
  FormLabel,
  Paper,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import { Link, resolvePath } from "react-router-dom";
import { useChildrenInfoResponse } from "../../../hooks";
import { ROUTES_URL } from "../../../router";
import {
  getChildrenInfo,
  getChildrenInfoRequestData,
  getChildrenInfoTotalPages,
  setChildrenRequestData,
  useAppDispatch,
  useAppSelector,
} from "../../../store";
import { ChildrenFilterType, ChildrenSortType } from "../../../types";
import { createDinamicUrlString } from "../../../utils";
import { StyledChildrenInfo } from "./style";

export const ChildrenInfo = () => {
  const children = useAppSelector(getChildrenInfo);
  const childrenRequestData = useAppSelector(getChildrenInfoRequestData);
  const childrenTotalPages = useAppSelector(getChildrenInfoTotalPages);

  const { page, limit } = childrenRequestData;

  const { sorting, nameSortOrder, handleNameClick, setFilter } =
    useChildrenInfoResponse();

  const dispatch = useAppDispatch();

  const setChildrenPage = (
    _: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent> | null,
    page: number
  ) => {
    dispatch(setChildrenRequestData({ page: page + 1 }));
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch(
      setChildrenRequestData({
        page: 1,
        limit: parseInt(event.target.value, 10),
      })
    );
  };

  const handleFilterChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    value: string
  ) => {
    if (
      value === ChildrenFilterType.Scored ||
      value === ChildrenFilterType.NotScored ||
      value === "none"
    ) {
      setFilter(value);
    }
  };

  return (
    <StyledChildrenInfo>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">
                <TableSortLabel
                  direction={nameSortOrder}
                  onClick={handleNameClick}
                  active={sorting === ChildrenSortType.Name}
                >
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Profile Link</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {children && children.length > 0 ? (
              children.map((child) => {
                return (
                  <TableRow key={child.id}>
                    <TableCell align="center">{child.id}</TableCell>
                    <TableCell align="center">{child.name}</TableCell>
                    <TableCell align="center">{child.email}</TableCell>
                    <TableCell align="center">
                      <Link
                        to={resolvePath(
                          createDinamicUrlString(ROUTES_URL.ChildDetailedInfo, {
                            id: child.id,
                          })
                        )}
                      >
                        Link
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={5}>
                  <FormLabel>
                    There are no suited records at the moment
                  </FormLabel>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={5}>
                <FormLabel id="demo-radio-buttons-group-label">
                  Filter
                </FormLabel>
                <RadioGroup
                  defaultValue="none"
                  name="radio-buttons-group"
                  row
                  onChange={handleFilterChange}
                >
                  <FormControlLabel
                    value="none"
                    control={<Radio />}
                    label="None"
                  />
                  <FormControlLabel
                    value={ChildrenFilterType.Scored}
                    control={<Radio />}
                    label="Scored"
                  />
                  <FormControlLabel
                    value={ChildrenFilterType.NotScored}
                    control={<Radio />}
                    label="Not Scored"
                  />
                </RadioGroup>
              </TableCell>
            </TableRow>
            <TableRow>
              {childrenTotalPages ? (
                <TablePagination
                  count={childrenTotalPages}
                  onPageChange={setChildrenPage}
                  page={page - 1}
                  rowsPerPage={limit}
                  rowsPerPageOptions={[1, 5, 10, 25, 50, 100]}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  SelectProps={{ value: limit }}
                />
              ) : null}
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </StyledChildrenInfo>
  );
};
