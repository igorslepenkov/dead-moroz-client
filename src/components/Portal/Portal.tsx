import { ReactNode } from "react";
import { createPortal } from "react-dom";

export enum PortalTarget {
  ROOT = "root",
  MODAL = "modal",
}

interface IProps {
  target: PortalTarget;
  children: ReactNode;
}

export const Portal = ({ target, children }: IProps) => {
  const root = document.getElementById(target);
  return root ? createPortal(children, root) : null;
};
