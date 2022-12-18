import { createGlobalStyle } from "styled-components";
import { Color } from "./ui";

export const GlobalStyles = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    overflow: overlay;
    &::-webkit-scrollbar{
      width: 10px;
    }

    &::-webkit-scrollbar-track{
      background-color: transparent;
      border-radius: 30px;

      &:hover {
        background-color: ${Color.LightGray};
      }
    }

    &::-webkit-scrollbar-thumb{
      background-color: transparent;
      border-radius: 30px;

      &:hover {
        background-color: ${Color.PrimaryHover};
      }

      &:active {
        background-color: ${Color.PrimaryPressed};
      }
    }
  }

  #root{
    display: flex;
    flex-direction: column;
    justify-content: stretch;
    
    max-width: 1200px;
    min-height: 100vh;
    max-height: 100vh;
    margin: auto;

    font-family: 'Inter', sans-serif;
  }
`;
