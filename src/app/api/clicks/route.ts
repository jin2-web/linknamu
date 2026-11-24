import { connection, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { profile } from "@/data/profile";

type ClickDoc = {
  _id: string;
  count: number;
};

const COLLECTION = "clicks";
const validLinkIds = new Set(profile.links.map(function toId(link) {
  return link.id;
}));

async function getCollection() {
  const db = await getDb();
  return db.collection<ClickDoc>(COLLECTION);
}

/** 모든 링크의 클릭 수를 한 번에 반환한다. 예: { counts: { github: 42, blog: 3 } } */
export async function GET() {
  // 클릭 수는 계속 바뀌므로 빌드 때 미리 만들지 않고 항상 요청 시점에 DB를 조회한다
  await connection();

  try {
    const collection = await getCollection();
    const docs = await collection
      .find({ _id: { $in: [...validLinkIds] } })
      .toArray();

    const counts: Record<string, number> = {};
    for (const id of validLinkIds) counts[id] = 0;
    for (const doc of docs) counts[doc._id] = doc.count;

    return NextResponse.json({ counts });
  } catch {
    return NextResponse.json({ error: "클릭 수를 불러오지 못했습니다." }, { status: 500 });
  }
}

/** 요청 본문 { id } 에 해당하는 링크의 클릭 수를 1 늘리고 새 값을 반환한다. */
export async function POST(request: Request) {
  let id: unknown;
  try {
    ({ id } = await request.json());
  } catch {
    return NextResponse.json({ error: "잘못된 요청 형식입니다." }, { status: 400 });
  }

  if (typeof id !== "string" || !validLinkIds.has(id)) {
    return NextResponse.json({ error: "존재하지 않는 링크입니다." }, { status: 400 });
  }

  try {
    const collection = await getCollection();
    const doc = await collection.findOneAndUpdate(
      { _id: id },
      { $inc: { count: 1 } },
      { upsert: true, returnDocument: "after" },
    );
    return NextResponse.json({ id, count: doc?.count ?? 1 });
  } catch {
    return NextResponse.json({ error: "클릭 수를 저장하지 못했습니다." }, { status: 500 });
  }
}
