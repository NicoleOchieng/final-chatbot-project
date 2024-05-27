import Head from "next/head";

import { CallToAction } from "@/components/CallToAction";
import { Faqs } from "@/components/Faqs";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { PrimaryFeatures } from "@/components/PrimaryFeatures";
import { Reviews } from "@/components/Reviews";
import Link from "next/link";
import { Tooltip } from "react-tooltip";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";

export default function Page() {
  return (
    <>
      <Head>
        <title>Serenity Space | Your Space for Mental Well-being.</title>
        <meta name="description" content="Your Space for Mental Well-being" />
      </Head>
      <Header />
      <main>
        <Link href="/chat" passHref>
          <div className="fixed bottom-4 right-4 z-50">
            <button
              className="p-4 bg-blue-500 text-white rounded-full"
              data-tooltip-id="chat-tooltip"
              data-tooltip-content="Need help? Chat with Serenity"
            >
              <IoChatbubbleEllipsesOutline className="h-8 w-8" />
            </button>
          </div>
        </Link>
        <Tooltip
          id="chat-tooltip"
          className="z-50"
          place="left-start"
          style={{ backgroundColor: "rgb(59,130,246 )" }}
        />
        <Hero />
        <PrimaryFeatures />
        <Reviews />
        <CallToAction />
        <Faqs />
      </main>
      <Footer />
    </>
  );
}
