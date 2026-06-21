import { marqueeItems } from "@/lib/data";

export default function Marquee() {
  return (
    <section
      aria-label="Skills and focus areas"
      className="border-y border-edge bg-surface/20 py-6"
    >
      <div className="marquee-mask overflow-hidden">
        <div className="flex w-max animate-marquee">
          {[0, 1].map((rep) => (
            <ul
              key={rep}
              className="flex shrink-0 items-center"
              aria-hidden={rep === 1}
            >
              {marqueeItems.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-8 whitespace-nowrap px-8 font-display text-xl text-muted sm:text-2xl"
                >
                  {item}
                  <span className="h-1.5 w-1.5 rounded-full bg-amber/70" />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
