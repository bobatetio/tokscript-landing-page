import CatchAllClient from "./CatchAllClient";

export function generateStaticParams() {
  return [{ url: ["_"] }];
}

export default function Page({ params }) {
  return <CatchAllClient params={params} />;
}
