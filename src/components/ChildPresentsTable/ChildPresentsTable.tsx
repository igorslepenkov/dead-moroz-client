import { useToggle } from "../../hooks";
import { IPresent } from "../../types";
import { AddChildPresentForm } from "../AddChildPresentForm";
import {
  AddPresentButton,
  PresentImage,
  StyledChildPresentsTable,
  TableData,
  TableHeading,
} from "./style";

interface IProps {
  presents: IPresent[] | null;
}

export const ChildPresentsTable = ({ presents }: IProps) => {
  const [isAddPresentFormOpen, toggleAddPresentForm] = useToggle();

  if (isAddPresentFormOpen) {
    return <AddChildPresentForm toggleForm={toggleAddPresentForm} />;
  }

  return (
    <StyledChildPresentsTable>
      <thead>
        <tr>
          <TableHeading scope="col">#</TableHeading>
          <TableHeading scope="col">Name</TableHeading>
          <TableHeading scope="col">Image</TableHeading>
        </tr>
      </thead>
      <tbody>
        {presents ? (
          presents.map(({ name, image }, idx) => {
            return (
              <>
                <tr key={name}>
                  <TableData scope="row">{idx}</TableData>
                  <TableData>{name}</TableData>
                  <TableData>
                    {image.url ? <PresentImage src={image.url} /> : "No image"}
                  </TableData>
                </tr>
              </>
            );
          })
        ) : (
          <tr>
            <TableData colSpan={3}>
              You still don't have any selected presents
              <br />
              <AddPresentButton onClick={toggleAddPresentForm}>
                Add present
              </AddPresentButton>
            </TableData>
          </tr>
        )}
      </tbody>
      <tfoot>
        <tr>
          <TableData colSpan={3}>
            <AddPresentButton onClick={toggleAddPresentForm}>
              Add present
            </AddPresentButton>
          </TableData>
        </tr>
      </tfoot>
    </StyledChildPresentsTable>
  );
};
