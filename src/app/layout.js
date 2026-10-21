import "./globals.css";

export const metadata = {
  title: "Chess BI Analytics | Dashboard do Projeto Integrador",
  description: "Dashboard de Business Intelligence para análise de desempenho e estratégia em jogos de xadrez online (Lichess).",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className="dark h-full">
      <body className="min-h-full flex flex-col bg-[#0b0f17] text-gray-100 antialiased selection:bg-amber-500/30 selection:text-amber-200">
        {children}
      </body>
    </html>
  );
}
