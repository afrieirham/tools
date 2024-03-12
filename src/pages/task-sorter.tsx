import { Dialog, Transition } from "@headlessui/react";
import { nanoid } from "nanoid";
import React, { Fragment, useRef, useState } from "react";

type Task = {
  id: string;
  name: string;
  vote: number;
};

function TaskSorter() {
  const cancelButtonRef = useRef(null);
  const [tasks, setTasks] = useState<Task[]>([]);

  const [loading, setLoading] = useState(false);
  const [isSorted, setSorted] = useState(false);
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);

  const onAddTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTasks = [...tasks, { id: nanoid(), name: input, vote: 0 }];
    setTasks(newTasks);
    setInput("");
  };

  const isLastComparison =
    index + 1 === (tasks.length * (tasks.length - 1)) / 2;

  const comparisonMatrix: number[][] = [];
  for (let i = 0; i < tasks.length; i++) {
    for (let j = i + 1; j < tasks.length; j++) {
      comparisonMatrix.push([i, j]);
    }
  }

  const onVote = (taskId: string) => {
    const newTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, vote: task.vote + 1 };
      }
      return task;
    });

    setTasks(newTasks);

    if (isLastComparison) {
      setLoading(true);
      setOpen(false);
      setSorted(true);
      const sortedTasks = tasks.sort((a, b) => b.vote - a.vote);

      setTimeout(() => {
        setLoading(false);
        setTasks(sortedTasks);
      }, 500);
      return;
    }

    setIndex(index + 1);
  };

  const hasTasks = Boolean(tasks.length);

  const hasTwoTasks = tasks.length > 1;
  const taskA = hasTwoTasks ? tasks[comparisonMatrix[index][0]] : null;
  const taskB = hasTwoTasks ? tasks[comparisonMatrix[index][1]] : null;

  return (
    <div className="flex flex-col items-center w-full max-w-sm p-8 mx-auto">
      <form
        onSubmit={onAddTask}
        className="flex flex-col items-center w-full mt-6 space-y-2"
      >
        <h1 className="text-center">task sorter</h1>
        <input
          value={input}
          placeholder="add a task"
          required
          onChange={(e) => setInput(e.target.value)}
          className="flex w-full h-10 max-w-sm px-3 py-2 mx-auto text-sm border rounded-md border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
        <button className="w-full max-w-sm py-2 text-sm bg-gray-200 rounded-lg hover:bg-gray-300">
          add
        </button>
      </form>

      <button
        className="max-w-sm mt-2 text-[.75rem] text-gray-500 hover:cursor-pointer hover:underline"
        onClick={() =>
          setTasks([
            { id: nanoid(), name: "Complete project proposal", vote: 0 },
            { id: nanoid(), name: "Attend team meeting at 10:00 AM", vote: 0 },
            {
              id: nanoid(),
              name: "Review code changes from pull request",
              vote: 0,
            },
            {
              id: nanoid(),
              name: "Prepare presentation for client meeting",
              vote: 0,
            },
            { id: nanoid(), name: "Send progress report to manager", vote: 0 },
          ])
        }
      >
        use demo tasks
      </button>

      {loading && (
        <p className="mt-4 text-sm animate-pulse">sorting tasks...</p>
      )}
      {hasTasks && !loading && (
        <>
          {isSorted ? (
            <p className="mt-8">here's your sorted tasks</p>
          ) : (
            <p className="mt-8">added tasks</p>
          )}
          <div className="w-full p-4 mt-2 space-y-4 border rounded-lg">
            <ol className="w-full pl-6">
              {tasks.map((task) => (
                <li key={task.id} className="text-sm list-decimal">
                  {task.name}
                </li>
              ))}
            </ol>
            {!isSorted && (
              <button
                onClick={() => setOpen(true)}
                className="w-full max-w-sm py-2 text-sm bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                help me sort
              </button>
            )}
          </div>
          {isSorted && (
            <p className="mt-4 text-sm animate-bounce">
              Be sure to save as screenshot before refreshing!
            </p>
          )}
        </>
      )}
      {hasTwoTasks && (
        <Transition.Root show={open} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            initialFocus={cancelButtonRef}
            onClose={setOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative px-4 py-4 overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                    <div>
                      <div className="text-center">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          Which on is more important?
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            A. {taskA!.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            B. {taskB!.name}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-center mt-4 space-x-4">
                      <button
                        onClick={() => onVote(taskA!.id)}
                        className="w-full max-w-sm py-2 text-sm bg-gray-200 rounded-lg hover:bg-gray-300"
                      >
                        task a
                      </button>
                      <button
                        onClick={() => onVote(taskB!.id)}
                        className="w-full max-w-sm py-2 text-sm bg-gray-200 rounded-lg hover:bg-gray-300"
                      >
                        task b
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      )}
      <div className="mt-16">
        <p className="text-sm text-center">why use this?</p>
        <video className="aspect-[9/16] w-full mt-2" controls>
          <source src="/explanation.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
}

function InstagramEmbed() {
  return (
    <blockquote
      className="instagram-media"
      data-instgrm-permalink="https://www.instagram.com/reel/C4QdP99K8D2/?utm_source=ig_embed&utm_campaign=loading"
      data-instgrm-version={14}
      style={{
        background: "#FFF",
        border: 0,
        borderRadius: 3,
        boxShadow: "0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)",
        margin: 1,
        maxWidth: 540,
        minWidth: 326,
        padding: 0,
        width: "calc(100% - 2px)",
      }}
    >
      <div style={{ padding: 16 }}>
        {" "}
        <a
          href="https://www.instagram.com/reel/C4QdP99K8D2/?utm_source=ig_embed&utm_campaign=loading"
          style={{
            background: "#FFFFFF",
            lineHeight: 0,
            padding: "0 0",
            textAlign: "center",
            textDecoration: "none",
            width: "100%",
          }}
          target="_blank"
        >
          {" "}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            {" "}
            <div
              style={{
                backgroundColor: "#F4F4F4",
                borderRadius: "50%",
                flexGrow: 0,
                height: 40,
                marginRight: 14,
                width: 40,
              }}
            />{" "}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
                justifyContent: "center",
              }}
            >
              {" "}
              <div
                style={{
                  backgroundColor: "#F4F4F4",
                  borderRadius: 4,
                  flexGrow: 0,
                  height: 14,
                  marginBottom: 6,
                  width: 100,
                }}
              />{" "}
              <div
                style={{
                  backgroundColor: "#F4F4F4",
                  borderRadius: 4,
                  flexGrow: 0,
                  height: 14,
                  width: 60,
                }}
              />
            </div>
          </div>
          <div style={{ padding: "19% 0" }} />{" "}
          <div
            style={{
              display: "block",
              height: 50,
              margin: "0 auto 12px",
              width: 50,
            }}
          >
            <svg
              width="50px"
              height="50px"
              viewBox="0 0 60 60"
              version="1.1"
              xmlns="https://www.w3.org/2000/svg"
              xmlnsXlink="https://www.w3.org/1999/xlink"
            >
              <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                <g
                  transform="translate(-511.000000, -20.000000)"
                  fill="#000000"
                >
                  <g>
                    <path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631" />
                  </g>
                </g>
              </g>
            </svg>
          </div>
          <div style={{ paddingTop: 8 }}>
            {" "}
            <div
              style={{
                color: "#3897f0",
                fontFamily: "Arial,sans-serif",
                fontSize: 14,
                fontStyle: "normal",
                fontWeight: 550,
                lineHeight: 18,
              }}
            >
              View this post on Instagram
            </div>
          </div>
          <div style={{ padding: "12.5% 0" }} />{" "}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginBottom: 14,
              alignItems: "center",
            }}
          >
            <div>
              {" "}
              <div
                style={{
                  backgroundColor: "#F4F4F4",
                  borderRadius: "50%",
                  height: "12.5px",
                  width: "12.5px",
                  transform: "translateX(0px) translateY(7px)",
                }}
              />{" "}
              <div
                style={{
                  backgroundColor: "#F4F4F4",
                  height: "12.5px",
                  transform: "rotate(-45deg) translateX(3px) translateY(1px)",
                  width: "12.5px",
                  flexGrow: 0,
                  marginRight: 14,
                  marginLeft: 2,
                }}
              />{" "}
              <div
                style={{
                  backgroundColor: "#F4F4F4",
                  borderRadius: "50%",
                  height: "12.5px",
                  width: "12.5px",
                  transform: "translateX(9px) translateY(-18px)",
                }}
              />
            </div>
            <div style={{ marginLeft: 8 }}>
              {" "}
              <div
                style={{
                  backgroundColor: "#F4F4F4",
                  borderRadius: "50%",
                  flexGrow: 0,
                  height: 20,
                  width: 20,
                }}
              />{" "}
              <div
                style={{
                  width: 0,
                  height: 0,
                  borderTop: "2px solid transparent",
                  borderLeft: "6px solid #f4f4f4",
                  borderBottom: "2px solid transparent",
                  transform: "translateX(16px) translateY(-4px) rotate(30deg)",
                }}
              />
            </div>
            <div style={{ marginLeft: "auto" }}>
              {" "}
              <div
                style={{
                  width: 0,
                  borderTop: "8px solid #F4F4F4",
                  borderRight: "8px solid transparent",
                  transform: "translateY(16px)",
                }}
              />{" "}
              <div
                style={{
                  backgroundColor: "#F4F4F4",
                  flexGrow: 0,
                  height: 12,
                  width: 16,
                  transform: "translateY(-4px)",
                }}
              />{" "}
              <div
                style={{
                  width: 0,
                  height: 0,
                  borderTop: "8px solid #F4F4F4",
                  borderLeft: "8px solid transparent",
                  transform: "translateY(-4px) translateX(8px)",
                }}
              />
            </div>
          </div>{" "}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              justifyContent: "center",
              marginBottom: 24,
            }}
          >
            {" "}
            <div
              style={{
                backgroundColor: "#F4F4F4",
                borderRadius: 4,
                flexGrow: 0,
                height: 14,
                marginBottom: 6,
                width: 224,
              }}
            />{" "}
            <div
              style={{
                backgroundColor: "#F4F4F4",
                borderRadius: 4,
                flexGrow: 0,
                height: 14,
                width: 144,
              }}
            />
          </div>
        </a>
        <p
          style={{
            color: "#c9c8cd",
            fontFamily: "Arial,sans-serif",
            fontSize: 14,
            lineHeight: 17,
            marginBottom: 0,
            marginTop: 8,
            overflow: "hidden",
            padding: "8px 0 7px",
            textAlign: "center",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          <a
            href="https://www.instagram.com/reel/C4QdP99K8D2/?utm_source=ig_embed&utm_campaign=loading"
            style={{
              color: "#c9c8cd",
              fontFamily: "Arial,sans-serif",
              fontSize: 14,
              fontStyle: "normal",
              fontWeight: "normal",
              lineHeight: 17,
              textDecoration: "none",
            }}
            target="_blank"
          >
            A post shared by Archer And Olive (@archerandolive)
          </a>
        </p>
      </div>
    </blockquote>
  );
}

export default TaskSorter;
