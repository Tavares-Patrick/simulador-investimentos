"use client";

import styles from "./Card.module.css";
import { ReactNode } from "react";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';




interface CardProps {
  title: string;
  description: string;
  href?: string;
  children?: ReactNode;
}

export default function Card({ title, description, href, children }: CardProps) {
  return (
    <div
      className={styles.card}
      onClick={() => href && (window.location.href = href)}
    >
      <div className={styles.cardHeader}>
        <h2>{title}</h2>
        <ArrowForwardIcon className={styles.icon} />
      </div>
      <p>{description}</p>
      {children && <div className={styles.cardFooter}>{children}</div>}
    </div>
  );
}
