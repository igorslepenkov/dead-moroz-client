import { MouseEvent } from "react";
import { useToggle } from "../../hooks";
import {
  deleteChildPresent,
  getUserError,
  getUserIsLoading,
  getUserServerMessage,
  useAppDispatch,
  useAppSelector,
} from "../../store";
import { IPresent } from "../../types";
import { AddChildPresentForm } from "../AddChildPresentForm";
import {
  NotificationModal,
  NotificationModalStatus,
} from "../NotificationModal";
import {
  AddPresentButton,
  PresentImage,
  StyledChildPresentsTable,
  TableData,
  TableHeading,
  DeletePresentIcon,
} from "./style";

interface IProps {
  presents: IPresent[] | null;
}

export const ChildPresentsTable = ({ presents }: IProps) => {
  const [isAddPresentFormOpen, toggleAddPresentForm] = useToggle();

  const [isModalOpen, toggleModal] = useToggle();
  const userDeletePresentIsLoading = useAppSelector(getUserIsLoading);
  const userDeletePresentError = useAppSelector(getUserError);
  const userDeletePresentMessage = useAppSelector(getUserServerMessage);

  const dispatch = useAppDispatch();

  const deleteChildPresentOnClick = (event: MouseEvent) => {
    const { target } = event;
    if (
      target instanceof SVGSVGElement &&
      target.dataset &&
      target.dataset.present_id
    ) {
      const { present_id } = target.dataset;
      dispatch(deleteChildPresent(present_id));
      toggleModal();
    }
  };

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
          <TableHeading scope="col">Delete</TableHeading>
        </tr>
      </thead>
      <tbody>
        {presents ? (
          presents.map(({ id, name, image }, idx) => {
            return (
              <>
                <tr key={name}>
                  <TableData scope="row">{idx + 1}</TableData>
                  <TableData>{name}</TableData>
                  <TableData>
                    {image.url ? <PresentImage src={image.url} /> : "No image"}
                  </TableData>
                  <TableData>
                    <DeletePresentIcon
                      data-present_id={id}
                      onClick={deleteChildPresentOnClick}
                    />
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
          <TableData colSpan={4}>
            <AddPresentButton onClick={toggleAddPresentForm}>
              Add present
            </AddPresentButton>
          </TableData>
        </tr>
      </tfoot>
      {!userDeletePresentIsLoading && (
        <NotificationModal
          isOpen={isModalOpen}
          status={
            userDeletePresentError
              ? NotificationModalStatus.Error
              : NotificationModalStatus.Success
          }
          message={
            userDeletePresentError
              ? userDeletePresentError
              : userDeletePresentMessage || "Oooooooooooooops"
          }
          handler={toggleModal}
        />
      )}
    </StyledChildPresentsTable>
  );
};
