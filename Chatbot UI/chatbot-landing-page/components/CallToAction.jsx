import { CircleBackground } from "@/components/CircleBackground";
import { Container } from "@/components/Container";

export function CallToAction() {
  return (
    <section
      id="call-to-action"
      className="relative overflow-hidden bg-primary py-20 sm:py-28"
    >
      <div className="absolute top-1/2 left-20 -translate-y-1/2 sm:left-1/2 sm:-translate-x-1/2">
        <CircleBackground color="#fff" className="animate-spin-slower" />
      </div>
      <Container className="relative">
        <div className="mx-auto max-w-md sm:text-center">
          <h2 className="text-3xl font-medium tracking-tight text-white sm:text-4xl">
            Elevate your well-being today
          </h2>
          <p className="mt-4 text-lg text-gray-100">
            Take a step towards mental wellness. Connect with our mental health
            advisor chat bot to receive personalized support and resources. It is
            a journey towards a healthier mind.
          </p>
          <div className="mt-8 flex justify-center"></div>
        </div>
      </Container>
    </section>
  );
}
