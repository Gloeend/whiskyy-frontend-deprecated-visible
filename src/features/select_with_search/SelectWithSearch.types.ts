import {Dispatch, SetStateAction} from "react";

export interface ISelectWithSearch {
    placeholder: string;
    onChange: Dispatch<SetStateAction<string>>
    items: string[]
}