import {parseArrayToString} from "@utils/parseArrayToString.ts";
import {InputHTMLAttributes} from "react";
import c from "./style.module.scss";
import {IWithIconInput} from "@features/input/Input.types.ts";

export const Input = (props: InputHTMLAttributes<HTMLInputElement>) => (
    <label className={c.label}>
        <input {...props} className={parseArrayToString(c.input)}/>
        <span className={c.placeholder}>{props.placeholder}</span>
    </label>
)
Input.InputWithIcon = (props: IWithIconInput) => (
    <label className={c.label}>
        <input {...props} className={parseArrayToString(c.input)}/>
        <span className={c.placeholder}>{props.placeholder}</span>
        <div className={c["icon-container"]}>
            {
                props.icon
            }
        </div>
    </label>
)