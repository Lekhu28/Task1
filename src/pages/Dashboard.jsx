import React, { useState } from "react";
import mockData from "../assets/data.json";
import timestamps from "../assets/timeStamps.json";
import Dropdown from "../component/dropdown/Dropdown";
import HeaderTitle from "../component/header-title/HeaderTitle";
import Search from "../component/search/Search";
import List from "../component/list/List";
import styles from "./Dashboard.module.css";
import Card from "../component/card/Card";

// Function to prepare data for the Card component
const prepareCardData = (order) => {
  
  // Modify this logic according to your actual order structure
  return {
    "Order ID": order["&id"],
    "Buy/Sell Indicator": order.executionDetails.buySellIndicator,
    "Order Status": order.executionDetails.orderStatus,
    "Order Type": "Market",
  };
};



const Dashboard = () => {
  const [currency, setCurrency] = useState("EUR");
  const [searchText, setSearchText] = useState("");
  const [selectedOrderDetails, setSelectedOrderDetails] = useState({});
  const [selectedOrderTimeStamps, setSelectedOrderTimeStamps] = useState({});

  // Currency conversion rates to USD (sample values, replace with actual rates)
  const currencyConversionRates = {
    USD: 1,    // USD to USD conversion rate (1 USD = 1 USD)
    EUR: 0.85, // EUR to USD conversion rate (1 EUR ≈ 0.85 USD)
    GBP: 0.72, // GBP to USD conversion rate (1 GBP ≈ 0.72 USD)
    JPY: 110.5 // JPY to USD conversion rate (1 JPY ≈ 110.5 USD)
  };

  const handleSelectOrder = (order) => {
    setSelectedOrderDetails(prepareCardData(order));
    
    setSelectedOrderTimeStamps(timestamps[order["&id"]] || {});
  };

  const orderWithTimestamps = mockData.results.map(order => {
    return {
      ...order,
      submittedDate: timestamps[order.id] || "Unknown",
      orderVolumeCurrency: order.bestExecutionData.orderVolume.USD * currencyConversionRates[currency],
    };
  });

  // Filter the orders based on the search input
  const filteredOrders = orderWithTimestamps.filter(order =>
    order["&id"].toString().includes(searchText)
  );

  // Calculate the total number of orders
  const totalOrders = mockData.results.length;

  return (
    <div>
      <div className={styles.header}>
        <HeaderTitle primaryTitle="Orders" secondaryTitle={`${totalOrders} orders`} />
        <div className={styles.actionBox}>
          <Search
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Dropdown
            options={["GBP", "USD", "JPY", "EUR"]}
            onChange={(e) => setCurrency(e.target.value)}
            selectedItem={currency}
          />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.section}>
          <Card
            cardData={selectedOrderDetails}
            title="Selected Order Details"
          />
          <Card
            cardData={selectedOrderTimeStamps}
            title="Selected Order Timestamps"
          />
        </div>
        <List rows={filteredOrders} currency={currency} onSelectOrder={handleSelectOrder} />
      </div>
    </div>
  );
};

export default Dashboard;
