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
        className="size-[150px] rounded-full border border-black/10 object-cover dark:border-white/15"
      />
      <h1 className="mt-5 text-2xl font-bold tracking-tight">{name}</h1>
      <p className="mt-2 text-base text-zinc-600 dark:text-zinc-400">{bio}</p>
    </header>
  );
}
