import {parseArrayToString} from "@utils/parseArrayToString.ts";
import catalogBackground from "@shared/backgrounds/catalog.jfif";
import c from "./style.module.scss";

export const AuctionBanner = () => (
    <section
        className={parseArrayToString("wrap relative flex justify-between py-[4rem] items-center", c.banner)}>
        <img width="100%" height="inherit" src={catalogBackground} alt="catalog backgroound"
             className={parseArrayToString(c.background, "object-cover absolute left-0 top-0 z-[-1]")}/>
        <h1 className="text-[var(--color-white-100)] text-[4rem]">August Auction 2023</h1>
        <p className="text-[1.0625rem] text-[var(--color-neutral-300)] text-right">
            This auction will run from <span className="text-[var(--color-white-100)]">Friday 28 July - Monday 7 August.</span>
            <br/> It will close from 7pm (GMT) on Monday 7 August 2023.
        </p>
    </section>
)