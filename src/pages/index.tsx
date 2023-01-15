import dynamic from "next/dynamic";

const ComponentWithNoSSR = dynamic(
  () => import("@/components/UpcomingFigures"),
  {
    ssr: false,
  }
);

export default function Home() {
  return <ComponentWithNoSSR />;
}
