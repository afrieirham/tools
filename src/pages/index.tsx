import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col w-full p-6 mx-auto max-w-screen-sm">
      <h1 className="text-xl font-bold">
        tools by{" "}
        <a className="hover:underline" href="https://afrieirham.com">
          afrieirham
        </a>
      </h1>
      <div className="mt-6">
        <p className="text-sm text-gray-600">list of tools</p>
        <ul>
          <li className="list-disc list-inside hover:underline">
            <Link href="/task-sorter">task sorter ↗</Link>
          </li>
          <li className="list-disc list-inside hover:underline">
            <Link href="/url-cleaner">url cleaner ↗</Link>
          </li>
          <li className="list-disc list-inside hover:underline">
            <Link href="/can-i-embed">can i embed? ↗</Link>
          </li>
        </ul>
      </div>
    </main>
  );
}
