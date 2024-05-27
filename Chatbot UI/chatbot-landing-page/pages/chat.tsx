import { ChatBot } from "@/components/ChatBot";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import Head from "next/head";

export default function Page() {
  return (
    <>
      <Head>
        <title>Serenity Space | Your Space for Mental Well-being.</title>
        <meta name="description" content="Your Space for Mental Well-being" />
      </Head>
      <div className="flex flex-col min-h-screen gap-8">
        <Header />
        <div className="flex-grow">
          <ChatBot />
        </div>
        <Footer />
      </div>
    </>
  );
}
