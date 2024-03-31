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
    <div className="flex flex-col items-center w-full p-8 ">
      <div className="self-start">
        <a href="/" className="hover:underline">
          ← back to main page
        </a>
      </div>
      <form
        onSubmit={onAddTask}
        className="flex flex-col items-center w-full max-w-sm mx-auto mt-6 space-y-2"
      >
        <h1 className="text-center">task sorter</h1>
        <input
          value={input}
          placeholder="add a task"
          required
          onChange={(e) => setInput(e.target.value)}
          className="flex w-full h-10 max-w-sm px-3 py-2 mx-auto text-sm border border-gray-300 rounded-md border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
          <div className="w-full max-w-sm p-4 mx-auto mt-2 space-y-4 border rounded-lg">
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
      <div className="max-w-sm mx-auto mt-16">
        <p className="text-sm text-center">why use this?</p>
        <video className="aspect-[9/16] w-full mt-2" controls>
          <source src="/explanation.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
}

export default TaskSorter;
