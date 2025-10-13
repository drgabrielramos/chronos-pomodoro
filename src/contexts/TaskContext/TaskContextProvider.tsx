import { useEffect, useReducer } from 'react';
import { initialTaskState } from './initialTaskState';
import { TaskContext } from './TaskContext';
import { TaskReducer } from './taskReducer';
import { timerWorkerManager } from '../../workers/timerWorkerManager';
import { TaskActionTypes } from './taskActions';

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
      dispatch({type: TaskActionTypes.COMPLETE_TASK,
      }); 
      worker.terminate();
    } else {
       dispatch({type: TaskActionTypes.COUNT_DOWN,
        payload: { secondsRemaining: countDownSeconds },
     }); 
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