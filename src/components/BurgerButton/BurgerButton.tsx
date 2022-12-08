import { motion } from "framer-motion";

import { Color } from "../../ui";

import { StyledBurgerButton } from "./style";

interface IProps {
  isOpen: boolean;
  toggle?: () => void;
}

enum BurgerButtonState {
  Opened = "opened",
  Closed = "closed",
}

export const BurgerButton = ({ isOpen, toggle }: IProps) => {
  const transition = { x: { duration: 2 }, type: "spring", stiffness: 100 };
  const variant = isOpen ? BurgerButtonState.Opened : BurgerButtonState.Closed;
  const variants = {
    top: {
      [BurgerButtonState.Closed]: {
        rotate: 0,
        translateY: 0,
      },
      [BurgerButtonState.Opened]: {
        rotate: 45,
        translateY: 9,
      },
    },
    center: {
      [BurgerButtonState.Closed]: {
        opacity: 1,
      },
      [BurgerButtonState.Opened]: {
        opacity: 0,
      },
    },
    bottom: {
      [BurgerButtonState.Closed]: {
        rotate: 0,
        translateY: 0,
      },
      [BurgerButtonState.Opened]: {
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
