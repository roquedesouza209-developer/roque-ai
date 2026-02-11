import "./globals.css";

export const metadata = {
  title: "Roque AI",
  description: "Roque AI – Intelligent assistant platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white font-sans">
        {children}
      </body>
    </html>
  );
}
