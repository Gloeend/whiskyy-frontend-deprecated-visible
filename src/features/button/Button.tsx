import {FC} from "react";
import {IButton} from "./Button.types.ts";
import c from "./style.module.scss";
import {parseArrayToString} from "@utils/parseArrayToString.ts";
export const Button = (props: IButton) => (
    <button {...props} className={parseArrayToString(props.className ?? "", c.button)}>{props.children}</button>
)
const Favorites: FC<IButton> = (props): JSX.Element => (
    <button {...props} className={parseArrayToString(props.className ?? "", c.button, c.favorites)}>{props.children}</button>
)
Button.Favorites = Favorites;

const Secondary: FC<IButton> = (props): JSX.Element => (
    <button {...props} className={parseArrayToString(props.className ?? "", c.button, c.secondary)}>{props.children}</button>
)
Button.Secondary = Secondary;
const Outlined: FC<IButton> = (props): JSX.Element => (
    <button {...props} className={parseArrayToString(props.className ?? "", c.button, c.secondary)}>{props.children}</button>
)
Button.Outlined = Outlined;

const Icon: FC<IButton> = (props): JSX.Element => (
    <button {...props} className={parseArrayToString(props.className ?? "", c.button, c.icon)}>{props.children}</button>
)
Button.Icon = Icon;

const IconFavorites: FC<IButton> = (props): JSX.Element => (
    <button {...props} className={parseArrayToString(props.className ?? "", c.button, c.icon)}>{props.children}</button>
)
Button.IconFavorites = IconFavorites;

const Disabled: FC<IButton> = (props): JSX.Element => (
    <button {...props} className={parseArrayToString(props.className ?? "", c.button, c.disabled)}>{props.children}</button>
)
Button.Disabled = Disabled;

const Transparent: FC<IButton> = (props): JSX.Element => (
    <button {...props} className={parseArrayToString(props.className ?? "", c.button, c.transparent)}>{props.children}</button>
)
Button.Transparent = Transparent;


