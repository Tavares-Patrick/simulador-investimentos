import Card from "@/components/Card/Card";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Simulador de Investimentos</h1>
      <p className={styles.subtitle}>
        Escolha o tipo de simulação que deseja realizar:
      </p>
      <div className={styles.cardGrid}>
        <Card
          title="Simulação"
          description="Calcule o rendimento de aplicações financeiras"
          href="/simulacao"
        />
        <Card
          title="Sobre"
          description="Saiba mais sobre este projeto"
          href="/sobre"
        />
      </div>
    </div>
  );
}
