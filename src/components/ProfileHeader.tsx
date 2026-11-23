import Image from "next/image";

type ProfileHeaderProps = {
  name: string;
  bio: string;
  avatarUrl: string;
};

export default function ProfileHeader({ name, bio, avatarUrl }: ProfileHeaderProps) {
  return (
    <header className="flex flex-col items-center text-center">
      <Image
        src={avatarUrl}
        alt={`${name} 프로필 사진`}
        width={150}
        height={150}
        loading="eager"
        fetchPriority="high"
        className="size-[150px] rounded-full object-cover shadow-sm ring-1 ring-black/5 dark:ring-white/10"
      />
      <h1 className="mt-6 text-xl font-semibold tracking-tight">{name}</h1>
      <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400">{bio}</p>
    </header>
  );
}
