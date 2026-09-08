import { TestimonialCard } from "@/components/users/testimonial-card";
import { testimonials } from "@/lib/home/testimonials";

export default function Testimonials() {
  if (!testimonials.length) return null;
  return <section aria-label="What people say" className="mx-auto max-w-6xl px-6 py-20"><p className="mb-6 font-mono text-xs uppercase tracking-widest text-amber">What people say</p><TestimonialCard testimonials={testimonials} /></section>;
}
