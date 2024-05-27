import Link from "next/link";

import { Container } from "@/components/Container";

const faqs = [
  [
    {
      question: "How can I access mental health resources on this site?",
      answer:
        "Accessing mental health resources is simple. Navigate to the site, explore the available content, and find resources that align with your needs. You can also sign up for additional features and personalized support.",
    },
    {
      question:
        "Is my personal information secure on this mental health platform?",
      answer:
        "Absolutely. Your privacy and confidentiality are of utmost importance to us. We employ advanced security measures to safeguard your data, and you have control over the information you choose to share.",
    },
    {
      question: "How does the platform provide support for mental well-being?",
      answer:
        "Our platform offers various resources, articles, and interactive features to support your mental well-being. We aim to provide a safe space where you can explore, learn, and connect with others on similar journeys.",
    },
  ],
  [
    {
      question: "Can I access mental health content for free?",
      answer:
        "Yes, you can access a wide range of mental health content for free. We also offer premium subscriptions that provide additional benefits, such as personalized recommendations and exclusive content.",
    },
    {
      question: "How can I report concerning content or behavior?",
      answer:
        "Ensuring a safe environment is our priority. If you encounter any concerning content or behavior, you can report it through the platform. Our moderation team will promptly investigate and take appropriate action.",
    },
    {
      question: "What steps can I take to enhance my mental well-being?",
      answer:
        "Engaging with the content, participating in community discussions, and trying out recommended activities are effective ways to enhance your mental well-being. Consistent involvement can lead to a more meaningful and supportive experience.",
    },
  ],
  [
    {
      question: "Can I deactivate my account if needed?",
      answer:
        "Certainly. You have the option to deactivate your account in the platform's settings. Keep in mind that deactivation is reversible and will temporarily hide your profile and preferences.",
    },
    {
      question:
        "Is there customer support available for any issues or questions?",
      answer:
        "Yes, we have a dedicated support team ready to assist you. Feel free to reach out through the platform, and our team will provide guidance and support for any inquiries or issues you may have.",
    },
    {
      question: "Are there age restrictions on the platform?",
      answer:
        "Yes, users must be at least 18 years old to access our mental health platform. We prioritize creating a supportive and mature environment for our community.",
    },
  ],
];

export function Faqs() {
  return (
    <section
      id="faqs"
      aria-labelledby="faqs-title"
      className="border-t border-gray-200 py-20 sm:py-32"
    >
      <Container>
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2
            id="faqs-title"
            className="text-3xl font-medium tracking-tight text-gray-900"
          >
            Frequently asked questions
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            If you have anything else you want to ask,{" "}
            <Link href="" className="text-gray-900 underline">
              reach out to us
            </Link>
            .
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:max-w-none lg:grid-cols-3"
        >
          {faqs.map((column, columnIndex) => (
            <li key={columnIndex}>
              <ul role="list" className="space-y-10">
                {column.map((faq, faqIndex) => (
                  <li key={faqIndex}>
                    <h3 className="text-lg font-semibold leading-6 text-gray-900">
                      {faq.question}
                    </h3>
                    <p className="mt-4 text-sm text-gray-700">{faq.answer}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
