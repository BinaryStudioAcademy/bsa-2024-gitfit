type TaskFunction = () => void;

type TaskScheduler = {
	start: (schedule: string, task: TaskFunction) => void;
};

export { type TaskScheduler };
