import {InputHTMLAttributes, ReactNode} from "react";

export interface IWithIconInput extends InputHTMLAttributes<HTMLInputElement> {
    icon: ReactNode;
}