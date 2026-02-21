import Preloader from "@/components/ui/preloader";
import "./global.css"
import BootstrapForBrowser from "@/components/ui/bootstrapForBrowser";
import Header from "@/components/sections/header";
import CallToAction from "@/components/sections/callToAction";
import Footer from "@/components/sections/footer";

export const metadata = {
  title: "Ranjith | Personal Portfolio",
  description:
    "A modern personal portfolio showcasing projects, skills, services, and experience with a clean design and smooth user experience.",
  openGraph: {
    title: "Ranjith | Personal Portfolio",
    description:
      "A modern personal portfolio showcasing projects, skills, services, and experience with a clean design and smooth user experience.",
  },
  twitter: {
    title: "Ranjith | Personal Portfolio",
    description:
      "A modern personal portfolio showcasing projects, skills, services, and experience with a clean design and smooth user experience.",
  },
  icons: {
    icon: "/images/favicon.png",
    shortcut: "/images/favicon.png",
    apple: "/images/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <BootstrapForBrowser />
        <Preloader />
        <Header />
        {children}
        <CallToAction />
        <Footer />
      </body>
    </html>
  );
}

