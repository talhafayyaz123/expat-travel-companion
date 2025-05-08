import type { Metadata } from "next";
import "./globals.css";

import { Inter, Montserrat, Poppins } from "next/font/google";
import { Outfit } from "next/font/google"; // Import Outfit font
import ReduxProvider from "@/redux/ReduxProvider";
import { Toaster } from "sonner";
import Script from "next/script";

const FACEBOOK_PIXEL_ID = "608837771792997";

export const metadata: Metadata = {
  title: "Expat Global Group | Stay with local and meet travel partner",
  description:
    "Share your journey, save on stays, and find your perfect travel companion your adventure starts now",
};

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700"],
  variable: "--font-montserrat",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-outfit",
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap"
          rel="stylesheet"
        />

        {/* Facebook Pixel Script */}
        <Script
          id="facebook-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s) {
                if(f.fbq) return;
                n=f.fbq=function() {
                  n.callMethod ?
                    n.callMethod.apply(n, arguments) : n.queue.push(arguments);
                };
                if(!f._fbq) f._fbq=n;
                n.push=n;
                n.loaded=!0;
                n.version='2.0';
                n.queue=[];
                t=b.createElement(e);
                t.async=!0;
                t.src=v;
                s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s);
              }(window, document, 'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${FACEBOOK_PIXEL_ID}');
              fbq('track', 'PageView');
            `,
          }}
        />
      </head>
      <body
        suppressHydrationWarning={true}
        className={`${montserrat.variable} ${outfit.variable} ${inter.variable}`}
      >
        <ReduxProvider>
          {/* <Script
            async
            src="https://cdn.promotekit.com/promotekit.js"
            data-promotekit="be1fa9c9-767e-45b4-9391-906e35c17c94"
          ></Script> */}

          {children}
        </ReduxProvider>
        <Toaster />
      </body>
    </html>
  );
}
