import { motion } from "framer-motion";

import { Color } from "../../ui";

import { StyledBurgerButton } from "./style";

interface IProps {
  isOpen: boolean;
  toggle?: () => void;
}

enum BurgerButtonState {
  Open = "open",
  Closed = "closed",
}

export const BurgerButton = ({ isOpen, toggle }: IProps) => {
  const transition = { x: { duration: 2 }, type: "spring", stiffness: 100 };
  const variant = isOpen ? BurgerButtonState.Open : BurgerButtonState.Closed;
  const variants = {
    top: {
      closed: {
        rotate: 0,
        translateY: 0,
      },
      opened: {
        rotate: 45,
        translateY: 9,
      },
    },
    center: {
      closed: {
        opacity: 1,
      },
      opened: {
        opacity: 0,
      },
    },
    bottom: {
      closed: {
        rotate: 0,
        translateY: 0,
      },
      opened: {
        rotate: -45,
        translateY: -7,
      },
    },
  };

  return (
    <StyledBurgerButton onClick={toggle}>
      <motion.svg width="20" height="20" viewBox="0 0 20 20">
        <motion.line
          x1="0"
          y1="2"
          x2="20"
          y2="2"
          stroke={Color.Black}
          variants={variants.top}
          initial="closed"
          animate={variant}
          transition={transition}
        />
        <motion.line
          x1="0"
          y1="10"
          x2="20"
          y2="10"
          stroke={Color.Black}
          variants={variants.center}
          initial="closed"
          animate={variant}
          transition={transition}
        />
        <motion.line
          x1="0"
          y1="18"
          x2="20"
          y2="18"
          stroke={Color.Black}
          variants={variants.bottom}
          initial="closed"
          animate={variant}
          transition={transition}
        />
      </motion.svg>
    </StyledBurgerButton>
  );
};
