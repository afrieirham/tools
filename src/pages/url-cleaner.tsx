import React, { useState } from "react";

import { isValidUrl } from "@/utils";

type Param = {
  id: string;
  key: string;
  value: string;
  show: boolean;
};

function UrlCleaner() {
  const [baseUrl, setBaseUrl] = useState("");
  const [input, setInput] = useState("");
  const [params, setParams] = useState<Param[]>([]);

  const [copyText, setCopyText] = useState("copy");

  const onInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // set input value
    const value = e.target.value;
    setInput(value);

    if (!isValidUrl(value)) {
      return;
    }

    const url = new URL(value);

    // convert searchParams to paramsArray
    const paramsArray = url.search
      .replace("?", "")
      .split("&")
      .map((str) => {
        const [key, value] = str.split("=");
        return {
          id: str,
          key,
          value,
          show: true,
        };
      });

    setBaseUrl(url.origin);
    setParams(paramsArray);
  };

  const onToggleShow = (id: string) => {
    // toggle checkbox
    const newParams = params.map((p) => {
      if (p.id === id) {
        return {
          ...p,
          show: !p.show,
        };
      }
      return p;
    });
    setParams(newParams);

    // update textarea
    const shownParams = newParams.filter(({ show }) => show);
    if (shownParams.length === 0) {
      setInput(baseUrl);
      return;
    }

    const stringParams = shownParams
      .map(({ key, value }) => `${key}=${value}`)
      .join("&");

    setInput(`${baseUrl}/?${stringParams}`);
  };

  return (
    <div className="flex flex-col items-center w-full p-8 ">
      <div className="self-start">
        <a href="/" className="hover:underline">
          ← back to main page
        </a>
      </div>
      <div className="flex flex-col items-center w-full max-w-sm mx-auto mt-6 space-y-2">
        <h1 className="text-center">enter link</h1>
        <textarea
          value={input}
          placeholder="https://google.com?weird=stuff"
          required
          onChange={onInputChange}
          className="flex w-full h-10 max-w-sm px-3 py-2 mx-auto text-sm border rounded-md min-h-40 border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />

        <div className="w-full">
          {params?.map(({ id, key, value, show }) => (
            <div key={id} className="flex items-center space-x-1 space-y-1">
              <input
                type="checkbox"
                checked={show}
                onChange={() => onToggleShow(id)}
                className="w-4 h-4 mr-2 text-gray-600 border-gray-300 rounded focus:ring-gray-600"
              />
              <input
                readOnly
                value={key}
                className="text-[12px] flex-1 rounded border py-1 px-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
              <input
                readOnly
                value={value}
                className="text-[12px] flex-1 rounded border py-1 px-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
            </div>
          ))}
        </div>

        <div className="flex w-full space-x-2">
          <button
            type="button"
            onClick={async () => setInput(await navigator.clipboard.readText())}
            className="w-full max-w-sm py-2 text-sm bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            paste
          </button>
          <button
            type="button"
            onClick={() => {
              setInput("");
              setBaseUrl("");
              setParams([]);
            }}
            className="w-full max-w-sm py-2 text-sm bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            reset
          </button>
        </div>
        <button
          type="button"
          onClick={() => {
            navigator.clipboard.writeText(input);
            setCopyText("copied!");
            setTimeout(() => {
              setCopyText("copy");
            }, 1000);
          }}
          className="w-full max-w-sm py-2 text-sm text-white rounded-lg bg-gray-950 hover:bg-gray-800"
        >
          {copyText}
        </button>
        <br />
      </div>
    </div>
  );
}

export default UrlCleaner;
