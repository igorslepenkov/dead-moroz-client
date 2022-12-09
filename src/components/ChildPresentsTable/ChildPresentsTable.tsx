import { Fragment, MouseEventHandler } from "react";
import { useToggle } from "../../hooks";
import {
  deleteChildAlternativePresent,
  deleteChildPresent,
  getChildInfo,
  getUser,
  useAppDispatch,
  useAppSelector,
} from "../../store";
import { IPresent, USER_ROLES } from "../../types";
import { AddChildPresentForm } from "../AddChildPresentForm";
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
  const user = useAppSelector(getUser);
  const childInfo = useAppSelector(getChildInfo);

  const [isAddPresentFormOpen, toggleAddPresentForm] = useToggle();

  const dispatch = useAppDispatch();

  const deleteChildPresentOnClick: MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    const {
      currentTarget: {
        dataset: { present_id },
      },
    } = event;
    if (present_id) {
      if (user && user.role === USER_ROLES.Child) {
        dispatch(deleteChildPresent(Number(present_id)));
      }

      if (
        user &&
        (user.role === USER_ROLES.Elf || user.role === USER_ROLES.DeadMoroz) &&
        childInfo
      ) {
        dispatch(
          deleteChildAlternativePresent({
            presentId: Number(present_id),
            childProfileId: childInfo?.child.profileId,
          })
        );
      }
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
          presents.map(({ id, name, image, createdUserId }, idx) => {
            return (
              <Fragment key={id}>
                <tr>
                  <TableData scope="row">{idx + 1}</TableData>
                  <TableData>{name}</TableData>
                  <TableData>
                    {image.url ? <PresentImage src={image.url} /> : "No image"}
                  </TableData>
                  <TableData>
                    {user?.id === createdUserId ? (
                      <DeletePresentButton
                        data-present_id={id}
                        onClick={deleteChildPresentOnClick}
                      >
                        <DeletePresentIcon />
                      </DeletePresentButton>
                    ) : null}
                  </TableData>
                </tr>
              </Fragment>
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
    </StyledChildPresentsTable>
  );
};
