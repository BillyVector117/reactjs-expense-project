import styled from "styled-components";
import theme from "../theme";

//
const List = styled.ul`
  list-style: none;
  padding: 0 2.5rem; /* 40px */
  height: 100%;
  overflow-y: auto;

  li {
    grid-template-columns: 1fr 1fr 1fr auto;
  }

  @media (max-width: 50rem) {
    /*80px*/
    li {
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr;
    }
  }
`;

const ListElement = styled.li`
  padding: 1.25rem 0; /* 20px */
  border-bottom: 2px solid #f2f2f2;
  display: grid;
  gap: 0.31rem; /* 5px */
  justify-content: space-between;

  & > div {
    width: 100%;
    display: flex;
    align-items: center;
  }

  &:hover button,
  &:hover a {
    opacity: 1;
  }
`;

const CategoriesList = styled.ul`
  list-style: none;
  padding: 0 2.5rem; /* 40px */
  height: 100%;
  overflow-y: auto;
`;

const CategoriesListElements = styled.li`
  padding: 1.25rem 0; /* 20px */
  border-bottom: 2px solid #f2f2f2;
  display: flex;
  justify-content: space-between;
`;

const Category = styled.div`
  font-weight: 500;
  font-size: 1.25rem; /* 20px */
  text-transform: uppercase;
  display: flex;
  align-items: center;

  svg {
    width: 3.12rem; /* 50px */
    height: auto;
    margin-right: 1.25rem; /* 20px */
    border-radius: 0.62rem; /* 10px */
  }

  @media (max-width: 50rem) {
    /* 80px */
    font-size: 1.12rem;
  }
`;

const Description = styled.div`
  justify-content: center;
  font-size: 1.25rem;
  text-transform: capitalize;
  color: ${(props) => (props.darkMode ? "#f9f9f9" : "#000000;")};
  @media (max-width: 50rem) {
    /* 50px */
    justify-content: end;
  }
`;

const Value = styled.div`
  font-size: 1.25rem; /* 20px */
  font-weight: 700;
  justify-content: end;
  color: ${(props) => (props.darkMode ? "#f9f9f9" : "#000000;")};
  @media (max-width: 50rem) {
    /* 80px */
    justify-content: start;
  }
`;

const Date = styled.div`
  border-radius: 0.31rem; /* 5px */
  background: ${theme.blue};
  text-align: center;
  color: #fff;
  padding: 0.62rem 3.12rem; /* 10px 50px */
  display: inline-block;
  margin: 1.25rem 0; /* 20px */

  @media (max-width: 50rem) {
    /* 80px */
    width: 100%;
  }
`;

const ButtonContainer = styled.div`
  @media (max-width: 50rem) {
    /* 80px */
    justify-content: end;
  }
`;

const ButtonAction = styled.button`
  outline: none;
  background: ${theme.Grey};
  border: none;
  width: 2.5rem; /* 40px */
  display: inline-block;
  height: 2.5rem; /* 40px */
  line-height: 2.5rem; /* 40px */
  font-size: 16px;
  cursor: pointer;
  border-radius: 0.31rem; /* 5px */
  margin-left: 0.625rem; /* 10px */
  transition: 0.3s ease all;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;

  &:hover {
    background: ${theme.greySecondary};
  }

  svg {
    width: 1.125rem; /* 18px */
  }

  @media (max-width: 50rem) {
    /* 80px */
    opacity: 1;
  }
`;

const SubtitleContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Subtitle = styled.h3`
  color: ${theme.greySecondary};
  font-weight: 400;
  font-size: 40px;
  padding: 2.5rem 0; /* 40px */
`;

const CenterButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 2.5rem; /* 40px */
`;

const LoadMoreButton = styled.button`
  background: ${theme.Grey};
  border: none;
  border-radius: 7px;
  color: #000;
  font-family: "Work Sans", sans-serif;
  padding: 1rem 1.87rem; /* 20px 30px */

  font-size: 1.25rem; /* 20px */
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  outline: none;
  transition: 0.3s ease all;

  &:hover {
    background: ${theme.greySecondary};
  }
`;

export {
  List,
  ListElement,
  CategoriesList,
  CategoriesListElements,
  Category,
  Description,
  Value,
  Date,
  ButtonContainer,
  ButtonAction,
  LoadMoreButton,
  CenterButtonContainer,
  SubtitleContainer,
  Subtitle,
};
