import { PlayCircleIcon, StopCircleIcon } from "lucide-react";
import { Cycles } from "../Cycles";
import { DefaultInput } from "../DefaultInput";
import { DefaultButton } from "../DefaultButton";
import { useRef} from "react";
import type { TaskModel } from "../../models/TaskModel";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { getNextCycle } from "../../utils/getNextCycle";
import { getNextCycleType } from "../../utils/getNextCycleType";
import { TaskActionTypes } from "../../contexts/TaskContext/taskActions";

export function MainForm () {

    // const [taskName, setTaskName] = useState('');
    const {state, dispatch} = useTaskContext ();
    const taskNameInput = useRef<HTMLInputElement>(null);

    const nextCycle = getNextCycle(state.currentCycle);
    const nextCycleType = getNextCycleType(nextCycle);

    function handleCreateNewTask (event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (taskNameInput.current === null) return;

        const taskName = taskNameInput.current.value.trim();

        if (!taskName) {
            alert('digite o nome da tarefa')
            return
        }

        const newTask: TaskModel= {
            id: Date.now().toString(),
            name: taskName,
            startDate: Date.now(),
            completeDate: null,
            interruptDate: null,
            duration: state.config[nextCycleType],
            type:nextCycleType
        };


        dispatch({type: TaskActionTypes.START_TASK, payload: newTask});
    }

    function handleInterruptTask () {
        dispatch({ type: TaskActionTypes.INTERRUPT_TASK });
    }

    return (
            <form onSubmit={handleCreateNewTask} className='form' action="">
                <div className='formRow'>
                    <DefaultInput 
                    labelText = 'Task'
                    id = 'meuId' 
                    type = 'text'
                    placeholder = 'digite algo'
                    // value = {taskName}
                    // onChange = {e => setTaskName(e.target.value)}
                    ref={taskNameInput}
                    disabled={!!state.activeTask}
                    />
                </div>

                <div className='formRow'>
                    <p>
                        Próximo intervalo é de 25 min
                    </p>
                </div>

                {state.currentCycle > 0 &&  (
                <div className='formRow'>
                    <Cycles/>
                </div>
                )}

                <div className='formRow'>
                    {!state.activeTask && (
                    <DefaultButton 
                        aria-label="Inicial nova tarefa"
                        title="Inicial nova tarefa"
                        type='submit' 
                        icon = {<PlayCircleIcon/>}
                        key={'botao_submit'}
                    />
                    )} 
                    {(!!state.activeTask &&
                    <DefaultButton 
                        aria-label="Interromper tarefa atual"
                        title="Interromper tarefa atual"
                        type='button' 
                        color="red"
                        icon = {<StopCircleIcon/>}
                        onClick={handleInterruptTask}
                        key={'botao_button'}
                    />
                    )}
                </div>
            </form>
    )
}