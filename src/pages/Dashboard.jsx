import React, { useState } from "react";
import mockData from "../assets/data.json";
import timestamps from "../assets/timeStamps.json";
import Dropdown from "../component/dropdown/Dropdown";
import HeaderTitle from "../component/header-title/HeaderTitle";
import Search from "../component/search/Search";
import List from "../component/list/List";
import styles from "./Dashboard.module.css";
import Card from "../component/card/Card";


const prepareCardData = (order) => {
  

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

 
  const currencyConversionRates = {
    USD: 1,   
    EUR: 0.85, 
    GBP: 0.72, 
    JPY: 110.5 
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

  
  const filteredOrders = orderWithTimestamps.filter(order =>
    order["&id"].toString().includes(searchText)
  );

  
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
