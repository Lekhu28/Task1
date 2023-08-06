import React from "react";
import styles from "./ListRowCell.module.css";

const ListRowCell = ({ children, rowKey }) => {
  return <td key={rowKey} className={styles.cell}>{children}</td>;
};

export default ListRowCell;
