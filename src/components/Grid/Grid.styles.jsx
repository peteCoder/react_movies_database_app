import styled from "styled-components";


export const Wrapper = styled.div`
    max-width: var(--maxWidth);
    margin: 0 auto; 
    padding: 0 20px;


    h1{
        color: var(--medGrey);
        margin: 60px 0;

        @media screen and (max-width: 760px){
            font-size: var(--fontBig);
        }
    }

`;

export const Content = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
`;




