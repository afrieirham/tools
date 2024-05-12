import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col w-full max-w-screen-sm p-6 mx-auto">
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
          <li className="list-disc list-inside hover:underline">
            <Link href="/seohead-generator">
              <code className="px-2 py-1 text-sm bg-gray-100 rounded">
                &lt;SEOHead/&gt;
              </code>{" "}
              generator ↗
            </Link>
          </li>
          <li className="list-disc list-inside hover:underline">
            <Link href="/epf-flexible">epf flexible ↗</Link>
          </li>
        </ul>
      </div>
    </main>
  );
}
