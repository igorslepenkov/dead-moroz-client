import { useEffect } from "react";
import { MouseEvent } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  TableFooter,
  TablePagination,
  Button,
  TableSortLabel,
  FormLabel,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormControl,
} from "@mui/material";
import {
  fetchMorozInfoElves,
  getMorozInfoElves,
  getMorozInfoElvesRequestParams,
  setMorozInfoElvesRequestParams,
  useAppDispatch,
  useAppSelector,
  getMorozInfoElvesTotalPages,
  getMorozInfoElvesTotalRecords,
  ElvesFilterType,
  ElvesSortType,
} from "../../../store";
import { StyledElvesInfo } from "./style";
import { AddNewElfForm } from "../../AddNewElfForm";
import { useMorozInfoElvesRequestData, useToggle } from "../../../hooks";

export const ElvesInfo = () => {
  const {
    sorting,
    nameSortOrder,
    reviewsSortOrder,
    handleNameClick,
    handleReviewsClick,
    setFilter,
  } = useMorozInfoElvesRequestData();

  const [isAddNewElfFormOpen, toggleAddNewElfForm] = useToggle();

  const elves = useAppSelector(getMorozInfoElves);
  const elvesTotalPages = useAppSelector(getMorozInfoElvesTotalPages);
  const elvesTotalRecords = useAppSelector(getMorozInfoElvesTotalRecords);
  const requestParams = useAppSelector(getMorozInfoElvesRequestParams);
  const { page, limit } = requestParams;

  const dispatch = useAppDispatch();

  const setElvesPage = (
    _: MouseEvent<HTMLButtonElement, globalThis.MouseEvent> | null,
    page: number
  ) => {
    dispatch(setMorozInfoElvesRequestParams({ page: page + 1 }));
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch(
      setMorozInfoElvesRequestParams({
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
      value === ElvesFilterType.AcceptedInvitation ||
      value === ElvesFilterType.NotAcceptedInvitation ||
      value === "none"
    ) {
      setFilter(value);
    }
  };

  useEffect(() => {
    const fetchElves = async () => {
      dispatch(fetchMorozInfoElves());
    };

    fetchElves();
  }, [requestParams]);

  return (
    <StyledElvesInfo>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">
                <TableSortLabel
                  direction={nameSortOrder}
                  onClick={handleNameClick}
                  active={sorting === ElvesSortType.Name}
                >
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Invitation Set At</TableCell>
              <TableCell align="center">
                <TableSortLabel
                  direction={reviewsSortOrder}
                  onClick={handleReviewsClick}
                  active={sorting === ElvesSortType.ReviewsCount}
                >
                  Reviews Count
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {elves && elves.length > 0 ? (
              elves.map((elf) => {
                return (
                  <TableRow key={elf.id}>
                    <TableCell align="center">{elf.id}</TableCell>
                    <TableCell align="center">{elf.name}</TableCell>
                    <TableCell align="center">{elf.email}</TableCell>
                    <TableCell align="center">{elf.invitationSentAt}</TableCell>
                    <TableCell align="center">{elf.reviewsCount}</TableCell>
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
                    value={ElvesFilterType.AcceptedInvitation}
                    control={<Radio />}
                    label="Accepted Invitation"
                  />
                  <FormControlLabel
                    value={ElvesFilterType.NotAcceptedInvitation}
                    control={<Radio />}
                    label="Not Accepted Invitation"
                  />
                </RadioGroup>
              </TableCell>
            </TableRow>
            <TableRow>
              {elvesTotalPages ? (
                <TablePagination
                  count={elvesTotalPages}
                  onPageChange={setElvesPage}
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
      {isAddNewElfFormOpen ? (
        <AddNewElfForm closeForm={toggleAddNewElfForm} />
      ) : (
        <Button onClick={toggleAddNewElfForm}>Add new elf-wroker</Button>
      )}
    </StyledElvesInfo>
  );
};
