import "./globals.css";

export const metadata = {
  title: "AI Doc Sense",
  description: "Your AI-powered document assistant",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
