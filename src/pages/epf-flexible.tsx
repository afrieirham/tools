import React, { useState } from "react";

const ringgit = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "MYR",
});

function EPFFlexible() {
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");

  const [amount1, setAmount1] = useState(0);
  const [amount2, setAmount2] = useState(0);

  const getEPFCase = () => {
    if (amount2 >= 3000) return 1;
    else if (amount2 > 1000) return 2;
    else return 3;
  };

  const epfCase = getEPFCase();
  const hasAmount2 = amount2 > 0;

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
          placeholder="enter your account 1 balance"
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
          placeholder="enter your account 2 balance"
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

      {hasAmount2 && (
        <div className="flex flex-col w-full max-w-sm mx-auto">
          <p>
            Your Account 2 balance is <b>{ringgit.format(amount2)}</b>
          </p>
          <p>
            Which means you are in <b>case {epfCase}</b>
          </p>
          <p className="mt-8">If you opt-in for the Initial Amount Transfer,</p>
        </div>
      )}

      {hasAmount2 && epfCase === 1 && (
        <CaseOne account1={amount1} account2={amount2} />
      )}
      {hasAmount2 && epfCase === 2 && (
        <CaseTwo account1={amount1} account2={amount2} />
      )}
      {hasAmount2 && epfCase === 3 && (
        <CaseThree account1={amount1} account2={amount2} />
      )}
    </div>
  );
}

function CaseOne({
  account1,
  account2,
}: {
  account1: number;
  account2: number;
}) {
  const currentAccount1 = account1;
  const currentAccount2 = account2;

  const nextAccount2 = currentAccount2 / 2;
  const nextAccount1 = currentAccount1 + (nextAccount2 * 1) / 3;
  const nextAccount3 = (nextAccount2 * 2) / 3;

  return (
    <>
      <div className="flex flex-col w-full max-w-sm mx-auto">
        <p>Your Account 2 (30%) will be split as below:</p>
        <p>
          <b>{ringgit.format(nextAccount1 - currentAccount1)}</b> (5%) will go
          to Account 1
        </p>
        <p>
          <b>{ringgit.format(nextAccount2)}</b> (15%) will stay in Account 2
        </p>
        <p>
          <b>{ringgit.format(nextAccount3)}</b> (10%) will go to Account 3
        </p>
      </div>
      <Table
        currentAccount1={currentAccount1}
        currentAccount2={currentAccount2}
        nextAccount1={nextAccount1}
        nextAccount2={nextAccount2}
        nextAccount3={nextAccount3}
      />
    </>
  );
}

function CaseTwo({
  account1,
  account2,
}: {
  account1: number;
  account2: number;
}) {
  const currentAccount1 = account1;
  const currentAccount2 = account2;

  const nextAccount1 = currentAccount1;
  const nextAccount2 = currentAccount2 - 1000;
  const nextAccount3 = 1000;

  return (
    <>
      <div className="flex flex-col w-full max-w-sm mx-auto">
        <p>
          <b>MYR 1,000</b> will be transfered to Account 3
        </p>
        <p>
          The remaining <b>{ringgit.format(nextAccount2)}</b> will stay in
          Account 2
        </p>
        <p>No transfer will be made to Account 1</p>
      </div>
      <Table
        currentAccount1={currentAccount1}
        currentAccount2={currentAccount2}
        nextAccount1={nextAccount1}
        nextAccount2={nextAccount2}
        nextAccount3={nextAccount3}
      />
    </>
  );
}

function CaseThree({
  account1,
  account2,
}: {
  account1: number;
  account2: number;
}) {
  const currentAccount1 = account1;
  const currentAccount2 = account2;

  const nextAccount1 = currentAccount1;
  const nextAccount2 = 0;
  const nextAccount3 = currentAccount2;

  return (
    <>
      <div className="flex flex-col w-full max-w-sm mx-auto">
        <p>All of your Account 2 balance will go to Account 3</p>
      </div>
      <Table
        currentAccount1={currentAccount1}
        currentAccount2={currentAccount2}
        nextAccount1={nextAccount1}
        nextAccount2={nextAccount2}
        nextAccount3={nextAccount3}
      />
    </>
  );
}

function Table({
  currentAccount1,
  currentAccount2,
  nextAccount1,
  nextAccount2,
  nextAccount3,
}: {
  currentAccount1: number;
  currentAccount2: number;
  nextAccount1: number;
  nextAccount2: number;
  nextAccount3: number;
}) {
  return (
    <>
      <div className="flex flex-col w-full max-w-sm mx-auto space-y-2">
        <p>Current Allocation</p>
        <div className="space-y-3">
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
      <div className="flex flex-col w-full max-w-sm mx-auto space-y-2">
        <p>Transferred Allocation</p>
        <div className="space-y-3">
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
    </>
  );
}

export default EPFFlexible;
