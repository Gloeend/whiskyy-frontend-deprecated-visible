import {Fragment, useEffect, useState} from "react";
import {ILot} from "@pages/catalog/model";
import {Product} from "@entities/product/Product.tsx";
import ReactPaginate from "react-paginate";
import {generateId} from "@utils/generateId.ts";
import {SliderArrow} from "src/shared/icons";
import {AuctionBanner} from "@widgets/auction_banner";
import {useCatalogApi} from "@pages/catalog/api";

export const CatalogPage = () => {
    const {productsAll} = useCatalogApi();
    const [page, setPage] = useState<number>(0);
    const [pages, setPages] = useState<number>();
    const [lots, setLots] = useState<ILot[]>([]);

    const asyncData = async () => {
        try {
            const {data, last_page} = await productsAll(page + 1);
            setLots(data);
            setPages(last_page)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        (() => asyncData())()
    }, [page]);

    return (
        <>
            <AuctionBanner></AuctionBanner>
            <section className="flex justify-center items-center py-[44px]">
                {
                    !pages ?
                        <></> :
                        <>
                            <ReactPaginate
                                breakLabel="..."
                                nextLabel={<div className="p-[30px_22px] border-solid border-[1px] border-[var(--color-neutral-200)] rounded-full ml-auto"><SliderArrow className="rotate-180"></SliderArrow></div>}
                                previousLabel={<div className="p-[30px_22px] border-solid border-[1px] border-[var(--color-neutral-200)] rounded-full"><SliderArrow></SliderArrow></div>}
                                onPageChange={(selectedItem) => setPage(selectedItem.selected)}
                                pageRangeDisplayed={5}
                                pageCount={pages}
                                containerClassName="flex wrap w-[100%] gap-[.25rem] items-center"
                                pageLinkClassName="text-[1.0625rem] font-medium p-[10px_12px] border-solid border-[1px] border-[var(--color-neutral-200)] rounded-[10px]"
                                renderOnZeroPageCount={null}
                            />
                        </>
                }
            </section>
            <section className="wrap grid grid-cols-4 gap-[1rem] mt-[2rem]">
                {
                    !lots[0] ? <></> : lots.map(el => <Fragment key={generateId()}><Product {...el}></Product></Fragment>)
                }
            </section>
        </>
    )
}