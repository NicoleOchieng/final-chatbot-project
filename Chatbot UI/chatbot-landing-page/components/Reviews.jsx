import clsx from "clsx";
import { useInView } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

import { Container } from "@/components/Container";

const reviews = [
  {
    title: "Guidance Through Challenges",
    body: "The mental health advisor chat bot on Serenity Space provided invaluable guidance during a challenging period. It offered support, coping strategies, and a listening ear. Grateful for the assistance!",
    author: "Wanjiru Mwangi",
    rating: 5,
  },
  {
    title: "A Compassionate Companion",
    body: "Using the mental health chat bot felt like having a compassionate companion. It offered reassurance, shared helpful resources, and provided a safe space to express my thoughts. Highly recommend!",
    author: "Daniel Kiptoo",
    rating: 4,
  },
  {
    title: "Empowering Conversations",
    body: "Engaging with the mental health advisor chat bot empowered me to take control of my mental well-being. The conversations were insightful, and the bot guided me towards self-discovery and resilience.",
    author: "Samantha Chepkoech",
    rating: 5,
  },
  {
    title: "Accessible Support 24/7",
    body: "The mental health chat bot is a reliable source of support, available 24/7. It's comforting to know that guidance is just a message away, providing assistance whenever I need it.",
    author: "Alex Maina",
    rating: 5,
  },
  {
    title: "Mindful Guidance",
    body: "The mental health advisor chat bot offered mindful guidance, helping me navigate stress and anxiety. The thoughtful responses and mindfulness exercises made a positive impact on my mental health journey.",
    author: "Sophia Wanjiru",
    rating: 4,
  },
  {
    title: "Tailored Recommendations",
    body: "I appreciated the personalized recommendations provided by the mental health chat bot. It understood my needs and directed me towards resources that resonated with my mental health goals.",
    author: "Oliver Kimani",
    rating: 5,
  },
  {
    title: "Compassionate Listening",
    body: "The mental health advisor chat bot excelled in compassionate listening. It created a non-judgmental space where I could express my feelings, fostering a sense of relief and understanding.",
    author: "Isabella Muthoni",
    rating: 5,
  },
  {
    title: "Encouraging Positive Habits",
    body: "Using the mental health chat bot encouraged me to develop positive habits for my mental well-being. It gently nudged me towards activities that promote mindfulness and emotional balance.",
    author: "Elijah Kiprop",
    rating: 4,
  },
  {
    title: "Navigating Uncertain Times",
    body: "During uncertain times, the mental health advisor chat bot served as a guiding light. It provided practical advice, coping mechanisms, and words of encouragement that helped me navigate challenges.",
    author: "Aisha Wambui",
    rating: 5,
  },
  {
    title: "A Supportive Ally",
    body: "The mental health chat bot became a supportive ally on my mental health journey. It offered guidance, encouragement, and resources, making me feel less alone in my struggles.",
    author: "Nathan Waweru",
    rating: 5,
  },
];

function StarIcon(props) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" {...props}>
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

function StarRating({ rating }) {
  return (
    <div className="flex">
      {[...Array(5).keys()].map((index) => (
        <StarIcon
          key={index}
          className={clsx(
            "h-5 w-5",
            rating > index ? "fill-primary" : "fill-gray-300"
          )}
        />
      ))}
    </div>
  );
}

function Review({ title, body, author, rating, className, ...props }) {
  let animationDelay = useMemo(() => {
    let possibleAnimationDelays = [
      "0s",
      "0.1s",
      "0.2s",
      "0.3s",
      "0.4s",
      "0.5s",
    ];
    return possibleAnimationDelays[
      Math.floor(Math.random() * possibleAnimationDelays.length)
    ];
  }, []);

  return (
    <figure
      className={clsx(
        "animate-fade-in rounded-3xl bg-white p-6 opacity-0 shadow-md shadow-gray-900/5",
        className
      )}
      style={{ animationDelay }}
      {...props}
    >
      <blockquote className="text-gray-900">
        <StarRating rating={rating} />
        <p className="mt-4 text-lg font-semibold leading-6 before:content-['“'] after:content-['”']">
          {title}
        </p>
        <p className="mt-3 text-base leading-7">{body}</p>
      </blockquote>
      <figcaption className="mt-3 text-sm text-gray-600 before:content-['–_']">
        {author}
      </figcaption>
    </figure>
  );
}

function splitArray(array, numParts) {
  let result = [];
  for (let i = 0; i < array.length; i++) {
    let index = i % numParts;
    if (!result[index]) {
      result[index] = [];
    }
    result[index].push(array[i]);
  }
  return result;
}

function ReviewColumn({
  className,
  reviews,
  reviewClassName = () => {},
  msPerPixel = 0,
}) {
  let columnRef = useRef();
  let [columnHeight, setColumnHeight] = useState(0);
  let duration = `${columnHeight * msPerPixel}ms`;

  useEffect(() => {
    let resizeObserver = new window.ResizeObserver(() => {
      setColumnHeight(columnRef.current.offsetHeight);
    });

    resizeObserver.observe(columnRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={columnRef}
      className={clsx("animate-marquee space-y-8 py-4", className)}
      style={{ "--marquee-duration": duration }}
    >
      {reviews.concat(reviews).map((review, reviewIndex) => (
        <Review
          key={reviewIndex}
          aria-hidden={reviewIndex >= reviews.length}
          className={reviewClassName(reviewIndex % reviews.length)}
          {...review}
        />
      ))}
    </div>
  );
}

function ReviewGrid() {
  let containerRef = useRef();
  let isInView = useInView(containerRef, { once: true, amount: 0.4 });
  let columns = splitArray(reviews, 3);
  columns = [columns[0], columns[1], splitArray(columns[2], 2)];

  return (
    <div
      ref={containerRef}
      className="relative -mx-4 mt-16 grid h-[49rem] max-h-[150vh] grid-cols-1 items-start gap-8 overflow-hidden px-4 sm:mt-20 md:grid-cols-2 lg:grid-cols-3"
    >
      {isInView && (
        <>
          <ReviewColumn
            reviews={[...columns[0], ...columns[2].flat(), ...columns[1]]}
            reviewClassName={(reviewIndex) =>
              clsx(
                reviewIndex >= columns[0].length + columns[2][0].length &&
                  "md:hidden",
                reviewIndex >= columns[0].length && "lg:hidden"
              )
            }
            msPerPixel={10}
          />
          <ReviewColumn
            reviews={[...columns[1], ...columns[2][1]]}
            className="hidden md:block"
            reviewClassName={(reviewIndex) =>
              reviewIndex >= columns[1].length && "lg:hidden"
            }
            msPerPixel={15}
          />
          <ReviewColumn
            reviews={columns[2].flat()}
            className="hidden lg:block"
            msPerPixel={10}
          />
        </>
      )}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-gray-50" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-gray-50" />
    </div>
  );
}

export function Reviews() {
  return (
    <section
      id="reviews"
      aria-labelledby="reviews-title"
      className="pt-20 pb-16 sm:pt-32 sm:pb-24 bg-gray-50"
    >
      <Container>
        <h2
          id="reviews-title"
          className="text-3xl font-medium tracking-tight text-gray-900 sm:text-center"
        >
          Hear from those who found support at Serenity Space.
        </h2>
        <p className="mt-2 text-lg text-gray-600 sm:text-center">
          Discover the stories of individuals who have found solace and
          encouragement on their mental health journey with us.
        </p>
        <ReviewGrid />
      </Container>
    </section>
  );
}
