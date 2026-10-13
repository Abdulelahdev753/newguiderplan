/** A green glass disc with a white tick: the guide has arrived. */
export function CheckGlassIcon() {
  return (
    // Vivid green, only slightly see-through, lit along the rim. The shadow stays tight so the
    // edge of the disc is still crisp.
    <div className="relative grid size-28 place-items-center overflow-hidden rounded-full bg-linear-to-br from-green-400/85 via-green-500/90 to-emerald-600/95 shadow-[0_3px_6px_rgb(4_120_87/0.3),inset_0_0_0_1.5px_rgb(255_255_255/0.45),inset_0_2px_2px_rgb(255_255_255/0.8),inset_0_-8px_14px_rgb(6_78_59/0.2)] backdrop-blur-md backdrop-saturate-150">
      {/* The sheen across the top of the glass, and the light caught at the bottom. */}
      <span className="absolute inset-x-2.5 top-1 h-[55%] rounded-[50%] bg-linear-to-b from-white/45 to-transparent" />
      <span className="absolute inset-x-6 bottom-1.5 h-1/4 rounded-[50%] bg-linear-to-t from-white/20 to-transparent" />
      <svg
        viewBox="8 8 32 32"
        fill="none"
        stroke="white"
        strokeWidth="5.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="relative size-20 drop-shadow-[0_1.5px_1.5px_rgb(6_78_59/0.5)]"
      >
        <path d="m12 25 8.5 8.5L36 16" />
      </svg>
    </div>
  );
}
