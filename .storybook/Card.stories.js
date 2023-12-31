import React from "react";
import { storiesOf } from "@storybook/react";
import Card from "../component/card/Card";

const cardData = {
  "Order ID": "SE|20221104|179|9:1:NEWO",
  "Buy/Sell Indicator": "Buy",
  "Order Status": "New",
  "Order Type": "Limit", 
  "Order Received": "2022-11-04T15:29:00Z",
  
};

storiesOf("Card", module)
  .add("Default", () => <Card cardData={cardData} title="Order Details" />);
