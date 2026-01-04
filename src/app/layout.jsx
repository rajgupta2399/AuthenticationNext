import { Outfit } from "next/font/google";
import "./globals.css";
import { Raleway } from "next/font/google";
import { SidebarProvider } from "../context/SidebarContext";
import { ThemeProvider } from "../context/ThemeContext";
import { ViewTransitions } from "next-view-transitions";
import ThemeAwareLoader from "../components/common/ThemeAwareLoader";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "../context/AuthContext";

const raleway = Raleway({
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ViewTransitions>
        <body className={`${raleway.className} dark:bg-gray-900`}>
          <ThemeProvider>
            <AuthProvider>
              <SidebarProvider>
                <ThemeAwareLoader />
                <Toaster />
                {children}
              </SidebarProvider>
            </AuthProvider>
          </ThemeProvider>
        </body>
      </ViewTransitions>
    </html>
  );
}
