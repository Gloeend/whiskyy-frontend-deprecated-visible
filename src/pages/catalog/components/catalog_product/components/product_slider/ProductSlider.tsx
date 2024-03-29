import {FC, Fragment, useState} from "react";
import {generateId} from "@utils/generateId.ts";
// @ts-ignore
import {SplideSlide, Splide, SplideProps, SplideTrack} from "@splidejs/react-splide";
import '@splidejs/react-splide/css';
import {SliderArrow} from "src/shared/icons";
import c from "./style.module.scss";
import {parseArrayToString} from "@utils/parseArrayToString.ts";

interface IProductSliderProps {
    pictures: string[]
}

const splideProps: SplideProps = {
    options: {
        type: "fade",
        classes: {
            arrows: 'splide__arrows',
            arrow: 'splide__arrow',
            prev: 'splide__arrow--prev',
            next: 'splide__arrow--next',
        },
        pagination: false
    },
    hasTrack: false
}

const buttonClasses =
    "!w-max !bg-[var(--color-white-100)] !h-max splide__arrow !block !p-[30px_22px] !border-solid !border-[1px] !border-[var(--color-neutral-200)] !rounded-full ml-auto"

export const ProductSlider: FC<IProductSliderProps> = ({pictures}) => {
    const [active, setActive] = useState<number>(0);

    return (
        <>
            <Splide {...splideProps}
                onMove={(_: any, newIndex: number) => {
                    setActive(newIndex)
                }}
            >
                <div className="splide__arrows">
                    <button
                        className={parseArrayToString("splide__arrow--next", buttonClasses)}>
                        <SliderArrow className="!min-w-[31px] !min-h-[18px] !rotate-180"></SliderArrow></button>
                    <button
                        className={parseArrayToString("splide__arrow--prev", buttonClasses)}>
                        <SliderArrow className="!min-w-[31px] !min-h-[18px] !transform-none"></SliderArrow></button>
                </div>
                <SplideTrack>
                    {
                        pictures.map((picture, ind) =>
                            <Fragment key={generateId()}>
                                <SplideSlide><img src={picture} alt={`picture slider ${ind}`}/></SplideSlide>
                            </Fragment>
                        )
                    }
                </SplideTrack>
                <div className={c.pagination}>
                    {
                        pictures.map((picture, ind) =>
                            <Fragment key={generateId()}><img src={picture} alt={`picture slider ${ind}`} className={parseArrayToString(c.pagination__item, active === ind ? c.active : "")}/></Fragment>
                        )
                    }
                </div>
            </Splide>
        </>
    )
}