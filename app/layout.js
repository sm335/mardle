import Link from 'next/link';

import { Analytics } from '@vercel/analytics/next';

import "@/app/globals.css";
import BackgroundImage from '../public/mardle.jpg';

export const metadata = {
    title: "Mardle.co - Marvel Rivals Riddles",
    description: "Guess Today's Marvel Rivals Hero!",
    robots: "noindex, nofollow",
    openGraph: {
        title: 'Mardle.co',
        description: 'Guess Today\'s Marvel Rivals Hero!',
        siteName: 'Mardle.co',
        type: "website"
    }
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Mardle.co",
    "url": "https://www.mardle.co"
}

export default function RootLayout({ children }) {
    return (
        <html lang="en" className="flex justify-center items-start">
            <head>
                <script type="application/ld+json">
                    {JSON.stringify(jsonLd)}
                </script>

                <link rel="preload" href="/heroes/adamwarlock.png" as="image" />
                <link rel="preload" href="/heroes/blackpanther.png" as="image" />
                <link rel="preload" href="/heroes/blackwidow.png" as="image" />
                <link rel="preload" href="/heroes/brucebanner.png" as="image" />
                <link rel="preload" href="/heroes/captainamerica.png" as="image" />
                <link rel="preload" href="/heroes/cloakdagger.png" as="image" />
                <link rel="preload" href="/heroes/doctorstrange.png" as="image" />
                <link rel="preload" href="/heroes/groot.png" as="image" />
                <link rel="preload" href="/heroes/hawkeye.png" as="image" />
                <link rel="preload" href="/heroes/hela.png" as="image" />
                <link rel="preload" href="/heroes/hulk.png" as="image" />
                <link rel="preload" href="/heroes/invisiblewoman.png" as="image" />
                <link rel="preload" href="/heroes/ironfist.png" as="image" />
                <link rel="preload" href="/heroes/ironman.png" as="image" />
                <link rel="preload" href="/heroes/jeffthelandshark.png" as="image" />
                <link rel="preload" href="/heroes/loki.png" as="image" />
                <link rel="preload" href="/heroes/lunasnow.png" as="image" />
                <link rel="preload" href="/heroes/magik.png" as="image" />
                <link rel="preload" href="/heroes/magneto.png" as="image" />
                <link rel="preload" href="/heroes/mantis.png" as="image" />
                <link rel="preload" href="/heroes/misterfantastic.png" as="image" />
                <link rel="preload" href="/heroes/moonknight.png" as="image" />
                <link rel="preload" href="/heroes/namor.png" as="image" />
                <link rel="preload" href="/heroes/peniparker.png" as="image" />
                <link rel="preload" href="/heroes/psylocke.png" as="image" />
                <link rel="preload" href="/heroes/rocketraccoon.png" as="image" />
                <link rel="preload" href="/heroes/scarletwitch.png" as="image" />
                <link rel="preload" href="/heroes/spiderman.png" as="image" />
                <link rel="preload" href="/heroes/squirrelgirl.png" as="image" />
                <link rel="preload" href="/heroes/starlord.png" as="image" />
                <link rel="preload" href="/heroes/storm.png" as="image" />
                <link rel="preload" href="/heroes/thepunisher.png" as="image" />
                <link rel="preload" href="/heroes/thor.png" as="image" />
                <link rel="preload" href="/heroes/venom.png" as="image" />
                <link rel="preload" href="/heroes/wintersoldier.png" as="image" />
                <link rel="preload" href="/heroes/wolverine.png" as="image" />
            </head>
            <body>
                <div className="flex flex-col justify-between w-[700px] max-w-[90vw] p-4 min-h-full">
                    <main>
                        <div className="flex flex-col gap-2 align-center text-center mb-10">
                            <h1 className="text-4xl text-white font-bold">
                                <Link href="/">Mardle.co</Link>
                            </h1>
                            <p className="text-gray-100">Improve your Marvel Rivals Knowledge!</p>
                        </div>
                        {children}
                    </main>

                    <div className="flex flex-col justify-center gap-1">
                        <div className="font-semibold text-white flex justify-center gap-4">
                            <Link className="hover:underline" href="/terms">Terms of Service</Link>
                            <Link className="hover:underline" href="/privacy">Privacy Policy</Link>
                        </div>
                        <span className="text-gray-400 text-sm text-center">{` © ${new Date().getFullYear()}, Mardle.co`}</span>
                    </div>
                </div>
                

                <img
                    className="background-image"
                    src={BackgroundImage.src}
                />

                <Analytics />
            </body>
        </html>
    );
}
