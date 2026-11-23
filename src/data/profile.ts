export type LinkItem = {
  /** 클릭 수 집계 시 링크를 구분하는 고유 ID */
  id: string;
  title: string;
  url: string;
};

export type Profile = {
  name: string;
  bio: string;
  avatarUrl: string;
  links: LinkItem[];
};

// TODO: 실제 프로필 정보와 링크로 교체하세요. (현재는 예시 데이터)
export const profile: Profile = {
  name: "정현희",
  bio: "세계 최강 바이크코더",
  avatarUrl: "/avatar.svg",
  links: [
    { id: "github", title: "GitHub", url: "https://github.com" },
    { id: "linkedin", title: "LinkedIn", url: "https://www.linkedin.com" },
    { id: "blog", title: "Blog", url: "https://velog.io" },
  ],
};
