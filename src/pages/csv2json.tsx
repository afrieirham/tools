import { FormEvent, useState } from "react";

function CSV2JSON() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const json = JSON.stringify(input.split(",").map((item) => item.trim()));
    setOutput(json);
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
        className="flex flex-col items-center w-full max-w-sm mx-auto space-y-2"
      >
        <h1>csv 2 json array</h1>
        <input
          value={input}
          placeholder="one, two, three"
          required
          onChange={(e) => setInput(e.target.value)}
          className="flex w-full h-10 max-w-sm px-3 py-2 mx-auto text-sm border border-gray-300 rounded-md border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
        {output && (
          <textarea
            readOnly
            value={output}
            placeholder=""
            className="flex w-full h-10 max-w-sm px-3 py-2 mx-auto text-sm border border-gray-300 rounded-md min-h-40 border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        )}
      </form>
    </div>
  );
}

export default CSV2JSON;
