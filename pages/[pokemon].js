import { useRouter } from "next/router";

export default function Pokemon() {
  const router = useRouter();
  const { pokemon } = router.query;
  return <div>{pokemon}</div>;
}
