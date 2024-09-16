type TaskFunction = () => void;

type TaskScheduler = {
	start: (task: TaskFunction) => void;
};

export { type TaskScheduler };
