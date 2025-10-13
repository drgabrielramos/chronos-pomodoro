import { useEffect, useReducer } from 'react';
import { initialTaskState } from './initialTaskState';
import { TaskContext } from './TaskContext';
import { TaskReducer } from './taskReducer';
import { timerWorkerManager } from '../../workers/timerWorkerManager';

type TaskContextProviderProps = {
    children: React.ReactNode
};

export function TaskContextProvider({ children }: TaskContextProviderProps) {
  const [state, dispatch] = useReducer(TaskReducer, initialTaskState);

  const worker = timerWorkerManager.getInstance()

  worker.onmessage(e => {
    const countDownSeconds = e.data
    console.log(e.data);

    if(countDownSeconds <= 0) {
      console.log('worker completed');
      worker.terminate()
    }
  });

  useEffect(() => {
    if (!state.activeTask) {
      console.log('worker terminado por falta de actie task');
      worker.terminate();
    }
    worker.postMessage(state);
  }, [worker, state]);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}