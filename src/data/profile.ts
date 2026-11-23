export type LinkItem = {
  /** 클릭 수 집계 시 링크를 구분하는 고유 ID */
  id: string;
  title: string;
  url: string;
  /** 제목 앞에 표시할 이모지 (선택) */
  emoji?: string;
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
  avatarUrl: "/profile.jpg",
  links: [
    { id: "github", title: "깃허브", url: "https://github.com/jin2-web", emoji: "🐙" },
    { id: "blog", title: "블로그", url: "https://cafe.naver.com/thisiscoding", emoji: "🟢" },
    { id: "email", title: "이메일", url: "mailto:jhunhee0075@gmail.com", emoji: "📧" },
  ],
};
