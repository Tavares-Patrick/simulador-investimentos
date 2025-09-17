import type { Metadata } from "next";
import StyledComponentsRegistry from "@/lib/registry";
import "../styles/global.css"; // ✅ agora aponta pro arquivo correto

export const metadata: Metadata = {
  title: "Simulador de Investimentos",
  description: "Calcule e visualize seus rendimentos em diferentes aplicações",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
