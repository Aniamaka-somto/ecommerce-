// app/layout.tsx
import { AuthProvider } from "@/context/AuthContext";
import ConditionalNavBar from "@/components/ConditionalNavbar"; // Updated import
import "./globals.css";
import ProtectedRoute from "../components/ProtectedRoute";

export const metadata = {
  title: "MyShop - Ecommerce Store",
  description: "Your one-stop shop for everything",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                document.documentElement.classList.add('dark')
              } else {
                document.documentElement.classList.remove('dark')
              }
              
              window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                if (e.matches) {
                  document.documentElement.classList.add('dark')
                } else {
                  document.documentElement.classList.remove('dark')
                }
              });
            `,
          }}
        />
      </head>
      <body>
        <AuthProvider>
          <ConditionalNavBar /> {/* Now conditional */}
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
