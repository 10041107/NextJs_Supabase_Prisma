"use client";

import React from "react";
import { Inter } from "next/font/google";
import styles from "./Layout.module.css";

const inter = Inter({ subsets: ["latin"] });

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className={styles.container}>
      {children}
    </div>
  );
};

export default Layout;
