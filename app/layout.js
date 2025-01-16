import "@styles/globals.css";
import { Providers } from "./Providers";

export const metadata = {
  title: "GRSL-VMS",
  description: "Recruitment | Payroll Management | Jobs | Career Development",
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <div className="main"></div>
        <Providers>
          <main className="app">{children}</main>
        </Providers>
      </body>
    </html>
  );
};
export default RootLayout;
