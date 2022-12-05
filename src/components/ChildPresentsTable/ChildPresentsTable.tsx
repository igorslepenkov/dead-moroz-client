import { MouseEventHandler } from "react";
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
  DeletePresentButton,
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

  const deleteChildPresentOnClick: MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    const { currentTarget } = event;
    if (currentTarget.dataset && currentTarget.dataset.present_id) {
      const { present_id } = currentTarget.dataset;
      dispatch(deleteChildPresent(Number(present_id)));
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
                    <DeletePresentButton
                      data-present_id={id}
                      onClick={deleteChildPresentOnClick}
                    >
                      <DeletePresentIcon />
                    </DeletePresentButton>
                  </TableData>
                </tr>
              </>
            );
          })
        ) : (
          <tr>
            <TableData colSpan={4}>
              You still don't have any selected presents
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
