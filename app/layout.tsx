import React from "react";
import "@/assets/styles/globals.css";
import NavBar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/components/AuthProvider";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "@/components/theme-provider";
import "photoswipe/dist/photoswipe.css";
export const metadata = {
  title: "Property Listing",
  keywords: "rental, property, real estate",
  description: "Find the perfect rental property",
};

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <html lang="en" suppressHydrationWarning>
        <body className="flex flex-col min-h-screen">
          <ThemeProvider
            attribute="class"
            enableSystem
            disableTransitionOnChange
          >
            <NavBar />
            <main className="mt-20 grow dark:bg-gray-800">{children}</main>
            <Footer />
            <ToastContainer />
          </ThemeProvider>
        </body>
      </html>
    </AuthProvider>
  );
};

export default MainLayout;
