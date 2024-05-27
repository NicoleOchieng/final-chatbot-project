import { Tab } from "@headlessui/react";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { Fragment, useEffect, useRef, useState } from "react";
import { AiFillGift } from "react-icons/ai";
import { BsFillChatFill, BsThreeDotsVertical } from "react-icons/bs";
import { FaFireFlameCurved } from "react-icons/fa6";
import { useDebouncedCallback } from "use-debounce";

import { CircleBackground } from "@/components/CircleBackground";
import { Container } from "@/components/Container";
import { PhoneFrame } from "@/components/PhoneFrame";
import Image from "next/image";

const features = [
  {
    name: "Discover Mental Wellness Resources",
    description:
      "Explore a curated collection of resources aimed at enhancing your mental well-being. From articles to guided exercises, our chatbot provides valuable insights and support to help you on your mental health journey.",
    icon: FaFireFlameCurved,
    screen: () =>
      ChatScreen([
        {
          sender: "Chatbot",
          message:
            "Hello! I'm here to support your mental well-being. How can I assist you today?",
        },
        {
          sender: "User",
          message:
            "I've been feeling a bit stressed lately. Any resources to help with that?",
        },
        {
          sender: "Chatbot",
          message:
            "Of course! I recommend checking out the following mental health resources to help manage stress:",
        },
        {
          sender: "Chatbot",
          message:
            "- [Mindful Breathing Exercises](https://www.example.com/mindful-breathing)",
        },
      ]),
  },
  {
    name: "Connect with Specialized Treatment",
    description:
      "For more specialized assistance, our chatbot can provide contact details for mental health professionals and resources in your area. It's a step towards getting the specific help you need for your mental health concerns.",
    icon: BsFillChatFill,
    screen: () =>
      ChatScreen([
        {
          sender: "Chatbot",
          message:
            "I understand that you may need more specialized assistance. I can provide contact details for mental health professionals and resources in your area. Would you like to proceed?",
        },
        {
          sender: "User",
          message: "Yes, please. I would appreciate that.",
        },
        {
          sender: "Chatbot",
          message:
            "Great! Please provide your location (city or region) so I can find relevant resources for you.",
        },
      ]),
  },
  {
    name: "Generate Email Report",
    description:
      "Generate a detailed email report summarizing your interactions with the chatbot. This report can be a useful reference for your personal records or to share with mental health professionals during in-person consultations.",
    icon: AiFillGift,
    screen: () =>
      ChatScreen([
        {
          sender: "Chatbot",
          message:
            "Would you like to generate a detailed email report summarizing your interactions with me? This report can be a useful reference for your personal records or to share with mental health professionals during in-person consultations.",
        },
        {
          sender: "User",
          message: "Yes, that sounds helpful. Please generate the report.",
        },
        {
          sender: "Chatbot",
          message:
            "Sure! I will compile the report and send it to the email associated with your account. If there's anything specific you'd like to include, please let me know.",
        },
      ]),
  },
];

function ChatScreen(messages) {
  return (
    <div className="bg-white h-full w-full flex flex-col">
      <div className="flex justify-between items-center shadow-md px-4 pt-8 pb-4">
        <div className="flex items-center gap-2">
          <div className="relative h-10 w-10 overflow-hidden rounded-full">
            <Image src={"/serenity.svg"} alt="" fill className="object-cover" />
          </div>
          <p className="font-medium text-gray-600">Serenity</p>
        </div>
      </div>
      <div className="space-y-4 p-6">
        {messages.map((message, index) => (
          <div key={index}>
            <div
              className={`${
                message.sender === "Chatbot"
                  ? "bg-primary text-white mr-auto"
                  : "bg-gray-200 ml-auto"
              } p-3 rounded-lg shadow-md max-w-[85%] break-words`}
            >
              {message.message}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function usePrevious(value) {
  let ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

function FeaturesDesktop() {
  let [changeCount, setChangeCount] = useState(0);
  let [selectedIndex, setSelectedIndex] = useState(0);
  let prevIndex = usePrevious(selectedIndex);
  let isForwards = prevIndex === undefined ? true : selectedIndex > prevIndex;

  let onChange = useDebouncedCallback(
    (selectedIndex) => {
      setSelectedIndex(selectedIndex);
      setChangeCount((changeCount) => changeCount + 1);
    },
    100,
    { leading: true }
  );

  return (
    <Tab.Group
      as="div"
      className="grid grid-cols-12 items-center gap-8 lg:gap-16 xl:gap-24"
      selectedIndex={selectedIndex}
      onChange={onChange}
      vertical
    >
      <Tab.List className="relative z-10 order-last col-span-6 space-y-6">
        {features.map((feature, featureIndex) => (
          <div
            key={feature.name}
            className="relative rounded-2xl transition-colors hover:bg-lightPrimary/30"
          >
            {featureIndex === selectedIndex && (
              <motion.div
                layoutId="activeBackground"
                className="absolute inset-0 bg-darkPrimary"
                initial={{ borderRadius: 16 }}
              />
            )}
            <div className="relative z-10 p-8">
              <feature.icon className="h-8 w-8 text-white" />
              <h3 className="mt-6 text-lg font-semibold text-white">
                <Tab className="text-left [&:not(:focus-visible)]:focus:outline-none">
                  <span className="absolute inset-0 rounded-2xl" />
                  {feature.name}
                </Tab>
              </h3>
              <p className="mt-2 text-sm text-gray-100">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </Tab.List>
      <div className="relative col-span-6">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <CircleBackground color="#FFFFFF" className="animate-spin-slower" />
        </div>
        <PhoneFrame className="z-10 mx-auto w-full max-w-[366px]">
          <Tab.Panels as={Fragment}>
            <AnimatePresence
              initial={false}
              custom={{ isForwards, changeCount }}
            >
              {features.map((feature, featureIndex) =>
                selectedIndex === featureIndex ? (
                  <Tab.Panel
                    static
                    key={feature.name + changeCount}
                    className="col-start-1 row-start-1 flex focus:outline-offset-[32px] [&:not(:focus-visible)]:focus:outline-none overflow-scroll bg-white no-scrollbar"
                  >
                    <feature.screen
                      animated
                      custom={{ isForwards, changeCount }}
                    />
                  </Tab.Panel>
                ) : null
              )}
            </AnimatePresence>
          </Tab.Panels>
        </PhoneFrame>
      </div>
    </Tab.Group>
  );
}

function FeaturesMobile() {
  let [activeIndex, setActiveIndex] = useState(0);
  let slideContainerRef = useRef();
  let slideRefs = useRef([]);

  useEffect(() => {
    let observer = new window.IntersectionObserver(
      (entries) => {
        for (let entry of entries) {
          if (entry.isIntersecting) {
            setActiveIndex(slideRefs.current.indexOf(entry.target));
            break;
          }
        }
      },
      {
        root: slideContainerRef.current,
        threshold: 0.6,
      }
    );

    for (let slide of slideRefs.current) {
      if (slide) {
        observer.observe(slide);
      }
    }

    return () => {
      observer.disconnect();
    };
  }, [slideContainerRef, slideRefs]);

  return (
    <>
      <div
        ref={slideContainerRef}
        className="-mb-4 flex snap-x snap-mandatory -space-x-4 overflow-x-auto overscroll-x-contain scroll-smooth pb-4 [scrollbar-width:none] sm:-space-x-6 [&::-webkit-scrollbar]:hidden"
      >
        {features.map((feature, featureIndex) => (
          <div
            key={featureIndex}
            ref={(ref) => (slideRefs.current[featureIndex] = ref)}
            className="w-full flex-none snap-center px-4 sm:px-6"
          >
            <div className="relative transform overflow-hidden rounded-2xl bg-darkPrimary px-5 py-6">
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <CircleBackground
                  color="#FFFFFF"
                  className={featureIndex % 2 === 1 ? "rotate-180" : undefined}
                />
              </div>
              <PhoneFrame className="relative mx-auto w-full max-w-[366px]">
                <feature.screen />
              </PhoneFrame>
              <div className="absolute inset-x-0 bottom-0 bg-darkPrimary p-6 backdrop-blur sm:p-10">
                <feature.icon className="h-8 w-8 text-white" />
                <h3 className="mt-6 text-sm font-semibold text-white sm:text-lg">
                  {feature.name}
                </h3>
                <p className="mt-2 text-sm text-gray-100">
                  {feature.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-center gap-3">
        {features.map((_, featureIndex) => (
          <button
            type="button"
            key={featureIndex}
            className={clsx(
              "relative h-0.5 w-4 rounded-full",
              featureIndex === activeIndex ? "bg-gray-300" : "bg-gray-500"
            )}
            aria-label={`Go to slide ${featureIndex + 1}`}
            onClick={() => {
              slideRefs.current[featureIndex].scrollIntoView({
                block: "nearest",
                inline: "nearest",
              });
            }}
          >
            <span className="absolute -inset-x-1.5 -inset-y-3" />
          </button>
        ))}
      </div>
    </>
  );
}

export function PrimaryFeatures() {
  return (
    <section
      id="features"
      aria-label="Features for mental wellness with the Chatbot"
      className="bg-primary py-20 sm:py-32"
    >
      <Container>
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-3xl">
          <h2 className="text-3xl font-medium tracking-tight text-white">
            Features for Enhanced Mental Wellness
          </h2>
          <p className="mt-2 text-lg text-white">
            Our mental health advisor chatbot is equipped with powerful features
            to support your well-being. Discover curated resources, connect with
            specialized treatment options, and generate detailed email reports.
            Your journey to mental wellness starts here!
          </p>
        </div>
      </Container>
      <div className="mt-16 md:hidden">
        <FeaturesMobile features={features} />
      </div>
      <Container className="hidden md:mt-20 md:block">
        <FeaturesDesktop features={features} />
      </Container>
    </section>
  );
}
