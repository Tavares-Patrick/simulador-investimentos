"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./Button.module.css";

interface ButtonProps {
  label: string;
  href?: string;
  onClick?: () => void;
  variant?: "submit" | "secondary";
}

const Button: React.FC<ButtonProps> = ({ label, href, onClick, variant = "submit" }) => {
  const router = useRouter();

  if (href) {
    // Se for só navegação estática → Link
    return (
      <Link href={href} className={styles[variant]}>
        {label}
      </Link>
    );
  }

  // Se for ação → botão normal
  return (
    <button type="button" className={styles[variant]} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
