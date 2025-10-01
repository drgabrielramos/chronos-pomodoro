import { PlayCircleIcon } from "lucide-react";
import { Cycles } from "../Cycles";
import { DefaultInput } from "../DefaultInput";
import { DefaultButton } from "../DefaultButton";

export function MainForm () {
    return (
            <form className='form' action="">
                <div className='formRow'>
                    <DefaultInput 
                    labelText='Task'
                    id = 'meuId' 
                    type = 'text'
                    placeholder='digite algo' 
                    />
                </div>

                <div className='formRow'>
                    <p>
                        Lorem ipsum dolor sit amet.
                    </p>
                </div>

                <div className='formRow'>
                    <Cycles/>
                </div>

                <div className='formRow'>
                    <DefaultButton icon = {<PlayCircleIcon/>}/>
                </div>
            </form>
    )
}