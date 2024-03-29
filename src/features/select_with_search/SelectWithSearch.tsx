import {FC, useEffect, useRef, useState} from "react";
import c from "./style.module.scss";
import {generateId} from "@utils/generateId.ts";
import {ISelectWithSearch} from "@features/select_with_search/SelectWithSearch.types.ts";
import {parseArrayToString} from "@utils/parseArrayToString.ts";
import {MingcuteDownLine, SearchOutline} from "src/shared/icons";

export const SelectWithSearch: FC<ISelectWithSearch> = (props) => {
    const [active, setActive] = useState<boolean>(false);
    const [search, setSearch] = useState<string>();
    const [selected, setSelected] = useState<string>();
    const wrapperRef = useRef<HTMLDivElement>(null);
    const {items, onChange, placeholder} = props;

    useEffect(() => {
        document.addEventListener("click", handleClickOutside, false);
        return () => {
            document.removeEventListener("click", handleClickOutside, false);
        };
    }, []);

    const handleClickOutside = (event: MouseEvent) => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
            setActive(false);
        }
    };

    return (
        <div ref={wrapperRef} className={parseArrayToString(c.container, active ? c.active : "")}>
            <button type="button" className={selected ? "!text-[var(--color-neutral-900)]" : ""}
                    onClick={() => setActive(!active)}>
                {
                    selected ?? placeholder
                }
                <MingcuteDownLine className={active ? "rotate-180 transition" : "transition"}></MingcuteDownLine>
            </button>
            <div className={parseArrayToString(c.select, (active ? c.active : ""))} id={generateId()}>
                <div className={c.label}>
                    <input onChange={(event) => setSearch(event.currentTarget.value)} type="text"
                           placeholder="Search..."/>
                    <button type="button"><SearchOutline className={c.searchIcon}></SearchOutline></button>
                </div>
                <div className={parseArrayToString("flex flex-col", c.list)}>
                    {
                        items.map(el => {
                            if (search && search !== "" && !el.toLowerCase().includes(search!.toLowerCase())) {
                                return false;
                            }
                            return (<button key={generateId()} type="button" className={c.button} onClick={() => {
                                setSelected(el);
                                onChange(el);
                                setActive(false);
                            }}>{el}</button>)
                        })
                    }
                </div>
            </div>
        </div>
    )
}