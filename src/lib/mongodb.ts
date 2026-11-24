import "server-only";
import { MongoClient, type Db } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("MONGODB_URI 환경 변수가 설정되지 않았습니다. .env.local을 확인하세요.");
}

// 개발 모드에서는 코드가 바뀔 때마다 모듈이 다시 로드되므로
// 전역 변수에 연결을 저장해 두고 재사용한다. (연결이 계속 늘어나는 것을 방지)
const globalForMongo = globalThis as typeof globalThis & {
  _mongoClientPromise?: Promise<MongoClient>;
};

function createClientPromise(): Promise<MongoClient> {
  return new MongoClient(uri as string).connect();
}

const clientPromise: Promise<MongoClient> =
  process.env.NODE_ENV === "development"
    ? (globalForMongo._mongoClientPromise ??= createClientPromise())
    : createClientPromise();

/** URI에 지정된 데이터베이스(linknamu)를 반환한다. */
export async function getDb(): Promise<Db> {
  const client = await clientPromise;
  return client.db();
}
