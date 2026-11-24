"use client";

import { useEffect, useState } from "react";
import type { LinkItem } from "@/data/profile";
import LinkCard from "@/components/LinkCard";

type LinkListProps = {
  links: LinkItem[];
};

type Counts = Record<string, number>;

function createZeroCounts(links: LinkItem[]): Counts {
  const counts: Counts = {};
  for (const link of links) counts[link.id] = 0;
  return counts;
}

export default function LinkList({ links }: LinkListProps) {
  // 데이터를 받기 전에는 모든 링크를 0회로 표시한다
  const [counts, setCounts] = useState<Counts>(function initCounts() {
    return createZeroCounts(links);
  });

  // 페이지가 열릴 때 모든 링크의 클릭 수를 한 번에 가져온다
  useEffect(function loadCounts() {
    const controller = new AbortController();

    async function fetchCounts() {
      try {
        const res = await fetch("/api/clicks", { signal: controller.signal });
        if (!res.ok) return;
        const data: { counts: Counts } = await res.json();
        setCounts(function mergeCounts(prev) {
          // 응답이 오기 전에 이미 누른 클릭이 있으면 더 큰 값을 유지한다
          const next: Counts = { ...prev };
          for (const [id, count] of Object.entries(data.counts)) {
            next[id] = Math.max(prev[id] ?? 0, count);
          }
          return next;
        });
      } catch {
        // 불러오기에 실패하면 0회 표시를 유지한다
      }
    }

    fetchCounts();
    return function cancel() {
      controller.abort();
    };
  }, []);

  function handleClick(id: string) {
    // 화면에는 바로 1을 더해 보여 준다
    setCounts(function increment(prev) {
      return { ...prev, [id]: (prev[id] ?? 0) + 1 };
    });

    // keepalive: 링크로 이동하며 페이지가 닫혀도 요청이 끝까지 전송되게 한다
    fetch("/api/clicks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
      keepalive: true,
    })
      .then(function readResponse(res) {
        return res.ok ? (res.json() as Promise<{ count: number }>) : null;
      })
      .then(function syncCount(data) {
        if (data) {
          setCounts(function applyServerCount(prev) {
            return { ...prev, [id]: Math.max(prev[id] ?? 0, data.count) };
          });
        }
      })
      .catch(function ignore() {
        // 전송 실패는 조용히 무시한다 (링크 이동은 그대로 진행)
      });
  }

  return (
    <ul className="flex w-full flex-col gap-3">
      {links.map(function renderLink(link) {
        return (
          <li key={link.id}>
            <LinkCard
              link={link}
              count={counts[link.id] ?? 0}
              onClick={function onLinkClick() {
                handleClick(link.id);
              }}
            />
          </li>
        );
      })}
    </ul>
  );
}
