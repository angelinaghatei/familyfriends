import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Image src="https://placecats.com/neo/300/200" width={300} height={200} alt="kat" />
    </div>
  );
}
