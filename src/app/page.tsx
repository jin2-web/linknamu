import ProfileHeader from "@/components/ProfileHeader";
import LinkList from "@/components/LinkList";
import { profile } from "@/data/profile";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-sm flex-1 flex-col items-center px-4 pt-16 pb-10 sm:pt-24">
      <ProfileHeader
        name={profile.name}
        bio={profile.bio}
        avatarUrl={profile.avatarUrl}
      />
      <div className="mt-10 w-full">
        <LinkList links={profile.links} />
      </div>
      <footer className="mt-auto pt-16 text-xs tracking-wide text-zinc-400 dark:text-zinc-600">
        링크나무
      </footer>
    </main>
  );
}
