import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  #root{
    display: flex;
    flex-direction: column;
    justify-content: stretch;
    
    max-width: 1200px;
    min-height: 100vh;
    margin: auto;

    font-family: 'Inter', sans-serif;
  }
`;
