// Dependencies
import React, { useState } from "react";
import styled from "styled-components";
// Elements
import theme from "../theme";
import { ReactComponent as Down } from "../images/down.svg";
import CategoryIcon from "../elements/CategoryIcon";
// Extract props from 'ExpenseForm' component (category state)
const CategorySelection = ({ category, setCategory, darkMode }) => {
  const [showSelection, setShowSelection] = useState(false); // Dropdown
  // Function to change the state of dropDown (active-deactive)
  const activeDropDown = () => {
    setShowSelection(!showSelection);
  };
  const categories = [
    { id: "Food", text: "Food" },
    { id: "Bank & payments", text: "Bank & payments" },
    { id: "House", text: "House" },
    { id: "Transport", text: "Transport" },
    { id: "Clothes", text: "Clothes" },
    { id: "Health and Hygiene", text: "Health and Hygiene" },
    { id: "Shopping", text: "Shopping" },
    { id: "Fun", text: "Fun" },
  ];
  // Change dropdown selector
  const handleClick = (event) => {
    /* console.log(event.target.dataset.value)
    console.log(event.currentTarget.dataset.value) */
    setCategory(event.currentTarget.dataset.value);
  };
  return (
    <SelectContainer onClick={activeDropDown} darkMode={darkMode} >
      <SelectedOption darkMode={darkMode}>
        {category} <Down />
        {showSelection && (
          <Options darkMode={darkMode}>
            {categories.map((category) => (
              /* '<Option/>' is a styled div */
              <Option
                key={category.id}
                data-value={category.id}
                onClick={handleClick}
                darkMode={darkMode}
              >
                {<CategoryIcon name={category.id} />}
                {category.text}
              </Option>
            ))}
          </Options>
        )}
      </SelectedOption >
    </SelectContainer>
  );
};
// Main selector-container
const SelectContainer = styled.div`

  background: ${(props) => (props.darkMode ? "#676262eb" : `${theme.greySecondary}`)};
  cursor: pointer;
  border-radius: 0.625rem; /* 10px */
  position: relative; // To add aligned options (dropdown)
  height: 5rem; /* 80px */
  width: 40%;
  padding: 0px 1.25rem; /* 20px */
  font-size: 1.5rem; /* 24px */
  text-align: center;
  display: flex;
  align-items: center;
  transition: 0.5s ease all;
  &:hover {
    background: ${theme.grisClaro2};
  }
`;

const SelectedOption = styled.div`
  width: 100%;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${(props) => (props.darkMode ? "#ffffff" : "#nnn")};
  svg {
    width: 1.25rem; /* 20px */
    height: auto;
    margin-left: 1.25rem; /* 20px */
  }
`;

const Options = styled.div`
  background: ${(props) => (props.darkMode ? "#676262eb" : `${theme.greySecondary}`)};
  position: absolute;
  top: 5.62rem; /* 90px */
  left: 0;
  width: 100%;
  border-radius: 0.625rem; /* 10px */
  max-height: 18.75rem; /* 300px */
  overflow-y: auto;
`;

const Option = styled.div`
  padding: 1.25rem; /* 20px */
  display: flex;
  svg {
    width: 28px;
    height: auto;
    margin-right: 1.25rem; /* 20px */
  }
  &:hover {
    background: ${(props) => (props.darkMode ? "#494545" : `#aec2c7`)};
  }
  
`;
export default CategorySelection;
