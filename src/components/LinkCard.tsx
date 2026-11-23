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
      className="block w-full rounded-xl border border-black/15 bg-white px-5 py-4 text-center font-medium shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 active:translate-y-0 dark:border-white/15 dark:bg-zinc-900 dark:focus-visible:outline-zinc-100"
    >
      {link.emoji && (
        <span aria-hidden="true" className="mr-2">
          {link.emoji}
        </span>
      )}
      {link.title}
    </a>
  );
}
