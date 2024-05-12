import React, { useState } from "react";

function EPFFlexible() {
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");

  const [amount1, setAmount1] = useState(0);
  const [amount2, setAmount2] = useState(0);

  const hasAmount = amount1 > 0 && amount2 > 0;

  const currentAccount1 = amount1;
  const currentAccount2 = amount2;
  const case1 = currentAccount2 >= 3000;
  const case2 = currentAccount2 > 1000;
  const case3 = currentAccount2 <= 1000;

  const getEpfCase = () => {
    if (case1) {
      return 1;
    } else if (case2) {
      return 2;
    } else return 3;
  };

  const caseTitle = case1 ? 1 : case2 ? 2 : 3;

  const getNextAccount2 = () => {
    if (case1) {
      return amount2 / 2;
    } else if (case2) {
      return currentAccount2 - 1000;
    } else {
      return 0;
    }
  };

  const nextAccount1 = case1
    ? currentAccount1 + (5 / 30) * amount2
    : currentAccount1;
  const nextAccount2 = getNextAccount2();

  const getNextAccount3 = () => {
    if (case1) {
      return (amount2 * 10) / 30;
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
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setAmount1(Number(input1));
          setAmount2(Number(input2));
        }}
        className="flex flex-col items-center w-full max-w-sm mx-auto space-y-2"
      >
        <h1 className="">EPF Flexible Calculator</h1>
        <input
          type="number"
          value={input1}
          placeholder="enter your account 1 balanace"
          required
          onChange={(e) => {
            setInput1(e.target.value);
            setAmount1(0);
            setAmount2(0);
          }}
          className="flex w-full h-10 max-w-sm px-3 py-2 mx-auto text-sm border border-gray-300 rounded-md border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
        <input
          type="number"
          value={input2}
          placeholder="enter your account 2 balanace"
          required
          onChange={(e) => {
            setInput2(e.target.value);
            setAmount1(0);
            setAmount2(0);
          }}
          className="flex w-full h-10 max-w-sm px-3 py-2 mx-auto text-sm border border-gray-300 rounded-md border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
        <button className="w-full max-w-sm py-2 text-sm bg-gray-200 rounded-lg hover:bg-gray-300">
          check
        </button>
        <p className="text-xs text-gray-500">
          Note that the numbers calculated might not be accurate.
        </p>
      </form>
      {hasAmount && (
        <div className="flex flex-col w-full max-w-sm mx-auto">
          <p>
            Your Account 2 balance is <b>{ringgit.format(currentAccount2)}</b>
          </p>
          <p>
            Which means you are in <b>case {caseTitle}</b>
          </p>
          <p className="mt-8">If you opt-in for the Initial Amount Transfer,</p>
        </div>
      )}
      {hasAmount && getEpfCase() === 1 && (
        <div className="flex flex-col w-full max-w-sm mx-auto">
          <p>Your Account 2 (30%) will be split as below:</p>
          <p>5% will go to Account 1</p>
          <p>15% will stay in Account 2</p>
          <p>10% will go to Account 3</p>
        </div>
      )}
      {hasAmount && getEpfCase() === 2 && (
        <div className="flex flex-col w-full max-w-sm mx-auto">
          <p>RM1,000 will be transfered to Account 3</p>
          <p>The remaining will stay in Account 2</p>
          <p>No transfer will be made to Account 1</p>
        </div>
      )}
      {hasAmount && getEpfCase() === 3 && (
        <div className="flex flex-col w-full max-w-sm mx-auto">
          <p>All of your Account 2 balance will go to Account 3</p>
        </div>
      )}

      {hasAmount && (
        <div className="flex flex-col w-full max-w-sm mx-auto space-y-2">
          <p>Current Allocation</p>
          <div className="text-sm space-y-3">
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
            <div>
              <p>TOTAL</p>
              <p className="font-bold">
                {ringgit.format(currentAccount1 + currentAccount2)}
              </p>
            </div>
          </div>
        </div>
      )}
      {hasAmount && (
        <div className="flex flex-col w-full max-w-sm mx-auto space-y-2">
          <p>Transferred Allocation</p>
          <div className="text-sm space-y-3">
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
            <div>
              <p>TOTAL</p>
              <p className="font-bold">
                {ringgit.format(nextAccount1 + nextAccount2 + nextAccount3)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EPFFlexible;
