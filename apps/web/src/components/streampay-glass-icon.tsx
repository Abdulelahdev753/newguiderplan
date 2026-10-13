// Each logo is sized by eye so all five carry the same weight side by side.
const cards = [
  { src: "/images/payments/mada.svg", width: 796, height: 266, className: "h-3.5" },
  { src: "/images/payments/visa.svg", width: 1000, height: 325, className: "h-3" },
  { src: "/images/payments/mastercard.svg", width: 1000, height: 618, className: "h-[19px]" },
  { src: "/images/payments/apple-pay.svg", width: 512, height: 210, className: "h-[15px]" },
  { src: "/images/payments/samsung-pay.svg", width: 419, height: 188, className: "h-[18px]" },
];

/** StreamPay's logo, with the cards it accepts in glass underneath. */
export function StreamPayGlassIcon() {
  // Kept nearly solid with a tight shadow: a wide shadow or a pale border reads as haze.
  const bar =
    "h-[13px] bg-linear-to-b from-black/80 to-black/95 shadow-[0_2px_3px_rgb(0_0_0/0.25),inset_0_1px_0_rgb(255_255_255/0.4)] backdrop-blur-md";

  // The logos read left to right on both sites; a brand mark is never mirrored.
  return (
    <div dir="ltr" className="flex flex-col items-center gap-4 lg:scale-125">
      <div className="flex items-center gap-1">
        {/* The mark's proportions on streampay.sa: two bars, one rounded corner each. */}
        <div className="flex h-9 w-[42px] flex-col justify-between">
          <span className={`rounded-tl-[7px] ${bar}`} />
          <span className={`rounded-br-[7px] ${bar}`} />
        </div>
        {/* The "stream" lettering from the logo on streampay.sa, at the logo's own spacing. */}
        <img
          src="/images/stream-wordmark.svg"
          alt=""
          width={650}
          height={163}
          decoding="async"
          className="h-[39px] w-auto select-none"
        />
      </div>

      {/* The logos themselves are the glass: solid colour, with a faint sheen across
          the top half that is cut to each logo's own shape. */}
      <ul className="flex items-center gap-2.5">
        {cards.map(({ src, width, height, className }) => (
          <li key={src} className="relative">
            <img
              src={src}
              alt=""
              width={width}
              height={height}
              decoding="async"
              className={`w-auto drop-shadow-[0_1px_1.5px_rgb(0_0_0/0.3)] select-none ${className}`}
            />
            <span
              className="absolute inset-0 bg-linear-to-b from-white/30 via-white/5 via-45% to-transparent to-55% [mask-size:100%_100%]"
              style={{ maskImage: `url(${src})` }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
