import type { LinkItem } from "@/data/profile";
import LinkCard from "@/components/LinkCard";

type LinkListProps = {
  links: LinkItem[];
};

export default function LinkList({ links }: LinkListProps) {
  return (
    <ul className="flex w-full flex-col gap-3">
      {links.map(function renderLink(link) {
        return (
          <li key={link.id}>
            <LinkCard link={link} />
          </li>
        );
      })}
    </ul>
  );
}
