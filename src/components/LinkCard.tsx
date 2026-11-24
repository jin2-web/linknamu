import type { LinkItem } from "@/data/profile";

type LinkCardProps = {
  link: LinkItem;
  count: number;
  onClick?: () => void;
};

export default function LinkCard({ link, count, onClick }: LinkCardProps) {
  // mailto: 같은 링크는 새 탭으로 열면 빈 탭만 남으므로 웹 주소만 새 탭으로 연다
  const isWebLink = link.url.startsWith("http");

  return (
    <a
      href={link.url}
      target={isWebLink ? "_blank" : undefined}
      rel={isWebLink ? "noopener noreferrer" : undefined}
      onClick={onClick}
      data-link-id={link.id}
      className="grid w-full grid-cols-[4rem_1fr_4rem] items-center rounded-2xl border border-black/[.06] bg-white px-4 py-3.5 text-sm font-medium transition-colors duration-200 hover:border-black/15 hover:bg-zinc-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 dark:border-white/[.08] dark:bg-zinc-900 dark:hover:border-white/20 dark:hover:bg-zinc-800 dark:focus-visible:outline-zinc-100"
    >
      <span aria-hidden="true" className="text-base leading-none">
        {link.emoji}
      </span>
      <span className="text-center">{link.title}</span>
      <span className="justify-self-end text-xs font-normal tabular-nums text-zinc-400 dark:text-zinc-500">
        <span className="sr-only">클릭 수 </span>
        {count.toLocaleString("ko-KR")}회
      </span>
    </a>
  );
}
