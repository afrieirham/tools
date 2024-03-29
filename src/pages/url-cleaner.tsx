import React, { useState } from "react";

function UrlCleaner() {
  const [input, setInput] = useState("");

  const onCleanUrl = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const url = new URL(input);
    const cleanUrl = url.protocol + "//" + url.hostname + url.pathname;
    setInput(cleanUrl);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-sm p-8 mx-auto">
      <div className="self-start">
        <a href="/" className="hover:underline">
          ← back to main page
        </a>
      </div>
      <form
        onSubmit={onCleanUrl}
        className="flex flex-col items-center w-full mt-6 space-y-2"
      >
        <h1 className="text-center">enter link</h1>
        <textarea
          value={input}
          placeholder="https://google.com?weird=stuff"
          required
          onChange={(e) => setInput(e.target.value)}
          className="min-h-40 flex w-full h-10 max-w-sm px-3 py-2 mx-auto text-sm border rounded-md border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
        <button className="w-full max-w-sm py-2 text-sm bg-gray-200 rounded-lg hover:bg-gray-300">
          clean
        </button>
      </form>
      <div></div>
    </div>
  );
}

export default UrlCleaner;
