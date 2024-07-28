// import Image from "next/image";
import {Button} from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen font-poppins bg-blue-950 text-white">
      <h2>Welcome back to nexuS</h2>
      <Link href={"/login"}><Button>Click Here to Login</Button></Link>
    </main>
  );
}
