import React, { useState } from "react";

function CanEmbed() {
  const [input, setInput] = useState("");
  const [url, setUrl] = useState("");

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValidUrl(input)) {
      alert("Not valid url");
    }

    setUrl(input);
  };

  return (
    <div className="flex flex-col items-center w-full p-8">
      <div className="self-start">
        <a href="/" className="hover:underline">
          ← back to main page
        </a>
      </div>
      <form
        onSubmit={onSubmit}
        className="flex flex-col items-center w-full mt-6 space-y-2 max-w-sm mx-auto mb-16"
      >
        <h1 className="text-center">can i embed this?</h1>
        <input
          value={input}
          placeholder="enter a url"
          required
          onChange={(e) => {
            setInput(e.target.value);
            setUrl("");
          }}
          className="flex w-full h-10 max-w-sm px-3 py-2 mx-auto text-sm border rounded-md border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
        <button className="w-full max-w-sm py-2 text-sm bg-gray-200 rounded-lg hover:bg-gray-300">
          check
        </button>
      </form>
      {url && <iframe src={url} className="min-h-screen w-full border" />}
    </div>
  );
}

export default CanEmbed;