import { useState } from "react";

function SeoHeadGenerator() {
  const initialCode = `import Head from "next/head";
  
function SEOHead({
  title,
  description,
  path,
  ogPath = "/og.png",
}: {
  title: string;
  description: string;
  path: string;
  ogPath: string;
}) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index,follow" />
      <link rel="canonical" href="https://<domain_placeholder>" />

      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />

      {/* Facebook Meta Tags */}
      <meta property="og:site_name" content={title} />
      <meta property="og:url" content={\`https://<domain_placeholder>$\{path}\`} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={\`https://<domain_placeholder>$\{ogPath}\`} />

      {/* Twitter Meta Tags */}
      <meta name="twitter:creator" content="<twitter_creator_placeholder>" />
      <meta name="twitter:site" content="<twitter_site_placeholder>" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="<domain_placeholder>" />
      <meta property="twitter:url" content={\`https://<domain_placeholder>$\{path}\`} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={\`https://<domain_placeholder>$\{ogPath}\`} />

      {/* Meta Tags Generated via https://tools.afrieirham.com/seohead-generator */}
    </Head>
  );
}

export default SEOHead;`;

  const usageCode = `<SEOHead
  title="My website title"
  description="My website description"
  path="/"
  ogPath="/og.png"
/>`;

  const [domain, setDomain] = useState("typit.in");
  const [twitterAuthor, setTwitterAuthor] = useState("@afrieirham_");
  const [twitterSite, setTwitterSite] = useState("@typit.in");

  return (
    <div className="flex flex-col items-center w-full p-4 space-y-8 sm:p-8">
      <div className="self-start">
        <a href="/" className="hover:underline">
          ← back to main page
        </a>
      </div>
      <div className="max-w-sm mx-auto space-y-2">
        <h1 className="text-center">
          Next.js{" "}
          <code className="px-2 py-1 text-sm bg-gray-100 rounded">
            &lt;SEOHead/&gt;
          </code>{" "}
          Generator
        </h1>
        <div>
          <label htmlFor="domain" className="text-sm">
            domain name (no http)
          </label>
          <input
            name="domain"
            placeholder="typit.in"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
        </div>
        <div>
          <label htmlFor="twitter-author" className="text-sm">
            author's twitter username
          </label>
          <input
            name="twitter-author"
            placeholder="@afrieirham_"
            value={twitterAuthor}
            onChange={(e) => setTwitterAuthor(e.target.value)}
            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
        </div>
        <div>
          <label htmlFor="domain" className="text-sm">
            site's twitter username
          </label>
          <input
            placeholder="@typit.in"
            value={twitterSite}
            onChange={(e) => setTwitterSite(e.target.value)}
            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
        </div>
      </div>

      <div className="w-full max-w-screen-lg mx-auto space-y-2 ">
        <div className="flex justify-between">
          <p className="text-base">Component</p>
        </div>

        <CodeBlock>
          {
            initialCode
              .replaceAll("<domain_placeholder>", domain)
              .replaceAll("<twitter_creator_placeholder>", twitterAuthor)
              .replaceAll("<twitter_site_placeholder>", twitterSite)
            //
          }
        </CodeBlock>
      </div>

      <div className="w-full max-w-screen-lg mx-auto space-y-2 ">
        <div className="flex justify-between">
          <p className="text-base">Usage</p>
        </div>

        <CodeBlock>{usageCode}</CodeBlock>
      </div>
    </div>
  );
}

function CodeBlock({ children }: { children: React.ReactNode }) {
  const [copying, setCopying] = useState(false);
  return (
    <div className="relative w-full p-4 text-sm border rounded-lg sm:p-6 bg-gray-50">
      <button
        onClick={() => {
          setCopying(true);
          navigator.clipboard.writeText(children as string);
          setTimeout(() => {
            setCopying(false);
          }, 1000);
        }}
        className="absolute top-0 right-0 px-4 py-1 m-4 text-sm bg-gray-200 rounded-md hover:bg-gray-300"
      >
        {copying ? "copied!" : "copy"}
      </button>
      <div className="w-full overflow-scroll whitespace-pre">
        <code>{children}</code>
      </div>
    </div>
  );
}

export default SeoHeadGenerator;
