import type { LinkItem } from "@/data/profile";

type LinkCardProps = {
  link: LinkItem;
};

export default function LinkCard({ link }: LinkCardProps) {
  // mailto: 같은 링크는 새 탭으로 열면 빈 탭만 남으므로 웹 주소만 새 탭으로 연다
  const isWebLink = link.url.startsWith("http");

  return (
    <a
      href={link.url}
      target={isWebLink ? "_blank" : undefined}
      rel={isWebLink ? "noopener noreferrer" : undefined}
      data-link-id={link.id}
      className="group grid w-full grid-cols-[1.5rem_1fr_1.5rem] items-center gap-2 rounded-2xl border border-black/[.06] bg-white px-4 py-3.5 text-sm font-medium transition-colors duration-200 hover:border-black/15 hover:bg-zinc-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 dark:border-white/[.08] dark:bg-zinc-900 dark:hover:border-white/20 dark:hover:bg-zinc-800 dark:focus-visible:outline-zinc-100"
    >
      <span aria-hidden="true" className="text-base leading-none">
        {link.emoji}
      </span>
      <span className="text-center">{link.title}</span>
      <svg
        aria-hidden="true"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-4 justify-self-end text-zinc-400 opacity-0 transition duration-200 group-hover:translate-x-0.5 group-hover:opacity-100 group-focus-visible:opacity-100"
      >
        <path d="M3 8h10M9 4l4 4-4 4" />
      </svg>
    </a>
  );
}
