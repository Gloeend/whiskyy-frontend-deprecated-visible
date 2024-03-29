import {FC} from "react";
import c from "./style.module.scss";
import {Button} from "src/features/button";
import {ILot} from "@pages/catalog/model";
import {FluentOpenFilled} from "src/shared/icons";
import {parseArrayToString} from "@utils/parseArrayToString.ts";
import {useNavigate} from "react-router-dom";

export const Product: FC<ILot> = (props) => {
    const { product, current_bid, id } = props;
    const navigate = useNavigate();

    return (
        <article className={parseArrayToString(c.product, "relative")}>
            <FluentOpenFilled className="absolute right-[1.5rem] top-[1.5rem]"></FluentOpenFilled>
            <img className={c.preview} src={JSON.parse(product.pictures as string)[0]} alt={product.title} />
            <h3 onClick={() => navigate(`${id}`)} className="mb-[1rem] line-clamp-2 cursor-pointer">{product.title}</h3>
            <div className="mt-auto">
                <div className="w-[100%] flex justify-between mb-[1rem] pb-[.5rem] border-dashed border-[0] border-b-[1px] border-[var(--color-neutral-200)]">
                    <span className="text-[var(--color-neutral-300)]">Current bid</span>
                    <span className="text-[var(--color-primary)] text-right font-medium">€ {current_bid}</span>
                </div>
                <div className="flex gap-[4px]">
                    <Button>Bid Now</Button>
                </div>
            </div>
        </article>
    )
}