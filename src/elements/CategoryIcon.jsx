import React from "react";
import { ReactComponent as FoodIcon } from "../images/cat_comida.svg";
import { ReactComponent as ShopIcon } from "../images/cat_compras.svg";
import { ReactComponent as BankandPayments } from "../images/cat_cuentas-y-pagos.svg";
import { ReactComponent as FunIcon } from "../images/cat_diversion.svg";
import { ReactComponent as HouseIcon } from "../images/cat_hogar.svg";
import { ReactComponent as ClothesIcon } from "../images/cat_ropa.svg";
import { ReactComponent as HealthAndHygieneIcon } from "../images/cat_salud-e-higiene.svg";
import { ReactComponent as TransportIcon } from "../images/cat_transporte.svg";

// Receive a Name Icon to load a specific icon
const CategoryIcon = ({ name }) => {
  switch (name) {
    case "Food":
      return <FoodIcon />;
    case "Bank & payments":
      return <BankandPayments />;

    case "Fun":
      return <FunIcon />;

    case "House":
      return <HouseIcon />;

    case "Clothes":
      return <ClothesIcon />;

    case "Health and Hygiene":
      return <HealthAndHygieneIcon />;

    case "Transport":
      return <TransportIcon />;

    case "Shopping":
      return <ShopIcon />;

    default:
      break;
  }
};

export default CategoryIcon;
