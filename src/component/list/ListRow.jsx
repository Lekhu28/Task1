import React from "react";
import styles from "./ListRow.module.css";

const ListCell = ({ children, rowKey, onSelect }) => {
  return <tr key={rowKey} className={styles.cell} onClick={onSelect}>{children}</tr>;
};

export default ListCell;
