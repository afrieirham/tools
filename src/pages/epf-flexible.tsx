import React, { useState } from "react";

function EPFFlexible() {
  const [input, setInput] = useState("");

  const amount = Number(input ?? 0);
  const currentAccount1 = (amount * 70) / 100;
  const currentAccount2 = (amount * 30) / 100;

  const case1 = currentAccount2 >= 3000;
  const case2 = currentAccount2 > 1000;

  const getNextAccount2 = () => {
    if (case1) {
      return (amount * 15) / 100;
    } else if (case2) {
      return currentAccount2 - 1000;
    } else {
      return 0;
    }
  };

  const nextAccount1 = case1 ? (amount * 75) / 100 : currentAccount1;
  const nextAccount2 = getNextAccount2();

  const getNextAccount3 = () => {
    if (case1) {
      return (amount * 10) / 100;
    } else if (case2) {
      return 1000;
    } else {
      return currentAccount2;
    }
  };

  const nextAccount3 = getNextAccount3();

  const ringgit = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "MYR",
  });

  return (
    <div className="flex flex-col items-center w-full p-8 space-y-8">
      <div className="self-start">
        <a href="/" className="hover:underline">
          ← back to main page
        </a>
      </div>
      <div className="flex flex-col items-center w-full max-w-sm mx-auto space-y-2">
        <h1 className="text-center">EPF Flexible</h1>
        <input
          type="number"
          value={input}
          placeholder="enter total EPF amount"
          required
          onChange={(e) => {
            setInput(e.target.value);
          }}
          className="flex w-full h-10 max-w-sm px-3 py-2 mx-auto text-sm border border-gray-300 rounded-md border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>
      <div className="flex flex-col items-center w-full max-w-sm mx-auto space-y-2">
        <p>Current Allocation</p>
        <div className="text-sm text-center space-y-3">
          <div>
            <p>Account 1</p>
            <p className="font-bold">{ringgit.format(currentAccount1)}</p>
          </div>
          <div>
            <p>Account 2</p>
            <p className="font-bold">{ringgit.format(currentAccount2)}</p>
          </div>
          <div>
            <p>Account 3</p>
            <p className="font-bold">{ringgit.format(0)}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center w-full max-w-sm mx-auto space-y-2">
        <p>Transferred Allocation</p>
        <div className="text-sm text-center space-y-3">
          <div>
            <p>Account 1</p>
            <p className="font-bold">{ringgit.format(nextAccount1)}</p>
          </div>
          <div>
            <p>Account 2</p>
            <p className="font-bold">{ringgit.format(nextAccount2)}</p>
          </div>
          <div>
            <p>Account 3</p>
            <p className="font-bold">{ringgit.format(nextAccount3)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EPFFlexible;
