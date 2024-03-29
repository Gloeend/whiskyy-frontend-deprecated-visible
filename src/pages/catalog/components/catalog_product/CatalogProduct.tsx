import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {ILot, lotInitial} from "@pages/catalog/model";
import {useAuth} from "@entities/auth_provider";
import {Button} from "src/features/button";
import {AuctionBanner} from "@widgets/auction_banner";
import {ChevronBackArrow, NimbusPlus, NimbusStop, PhInfo, UIFavorite} from "src/shared/icons";
import {ProductSlider} from "@pages/catalog/components/catalog_product/components/product_slider";
import {useCatalogApi} from "@pages/catalog/api";

export const CatalogProduct = () => {
    const {addToFavorites, productId, removeFromFavorites, bid} = useCatalogApi();
    const {token} = useAuth();
    const [mutation, setMutation] = useState<boolean>();
    const navigate = useNavigate();
    const [lot, setLot] = useState<ILot>(lotInitial);
    const {id} = useParams();

    const asyncData = async () => {
        const data = await productId(id as string, mutation);
        setLot(data)
    }
    const addToFavoritesMutation = async () => {
        await addToFavorites(lot.id).then(_ => setMutation(true))
    }
    const removeFromFavoritesMutation = async () => {
        await removeFromFavorites(lot.id).then(_ => setMutation(true))
    }
    const bidMutation = async () => {
        await bid(lot.id, lot.product.nextBid ?? 10).then(_ => {
            setMutation(true)
        })
    }

    useEffect(() => {
        if (typeof id === undefined) {
            navigate("/404")
        }
        if (!mutation) {
            asyncData();
            return;
        }
        asyncData().then(_ => setMutation(false));
    }, [mutation]);

    return !lot.id ? <></> : (
        <>
            <AuctionBanner></AuctionBanner>
            <section
                className="wrap svgContainer grid grid-cols-[fit-content(100%)_fit-content(100%)] justify-between mt-[2rem]">
                <Button.Outlined onClick={() => navigate(-1)}>
                    <ChevronBackArrow className="iconCurrentStrokePath"/>
                    Go back to Auction
                </Button.Outlined>
                {
                    token ?
                        <>
                            {
                                !lot.product.favorite ?
                                    <Button.Transparent onClick={() => addToFavoritesMutation()}>
                                        <UIFavorite className="iconCurrentFillPath"/>
                                        Add to Favorites
                                    </Button.Transparent> :
                                    <Button.Favorites onClick={() => removeFromFavoritesMutation()}>
                                        <UIFavorite className="iconCurrentFillPath"/>
                                        Remove from Favorites
                                    </Button.Favorites>
                            }
                        </>
                        :
                        <></>
                }
            </section>
            <section className="wrap grid grid-cols-[55%_1fr] mt-[2rem] gap-[44px]">
                <ProductSlider pictures={JSON.parse(lot.product.pictures as string)}/>
                <div>
                    <p className="font-bold text-[var(--color-primary)]">
                        Currently {lot.product.bidsCount ?? 0} bids
                    </p>
                    <h1 className="text-31px font-bold">
                        {
                            lot.product.title
                        }
                    </h1>
                    {
                        lot.reserve_price ?
                            <>
                                {
                                    lot.current_bid && lot.reserve_price > lot.current_bid ?
                                        <div className="mt-[1rem] flex items-center text-[var(--color-neutral-300)]">
                                            <NimbusStop className="inline mr-[2px]"/>
                                            Reserve not met
                                        </div> :
                                        <div className="mt-[1rem] flex items-center text-[var(--color-primary)]">
                                            <NimbusPlus className="inline mr-[2px] iconCurrentFillPath"/>
                                            Reserve has met
                                        </div>
                                }
                            </> :
                            <div className="mt-[1rem] flex items-center text-[var(--color-primary)]">
                                <NimbusPlus className="inline mr-[2px] iconCurrentFillPath"/>
                                No reserve
                            </div>
                    }
                    <div className="mt-[2rem]">
                        <div
                            className="w-[100%] py-[var(--variable-20px)] border-solid border-[1px] rounded-[var(--radius-general)] border-[var(--color-neutral-150)] flex flex-col justify-center items-center">
                            <span className="text-18px text-[var(--color-neutral-400)]">Current Bid</span>
                            <span className="text-31px font-medium">€ {lot.current_bid}</span>
                        </div>
                        <div
                            className="mb-[1rem] mt-[1rem] w-[100%] py-[var(--variable-20px)] border-solid border-[1px] rounded-[var(--radius-general)] border-[var(--color-neutral-150)] flex flex-col justify-center items-center">
                            {
                                token ?
                                    <>
                                        <span className="text-18px text-[var(--color-neutral-400)]">My Bid</span>
                                        <span
                                            className="text-31px font-medium text-[var(--color-primary)]">€ {lot.product.bid ? lot.product.bid.bid : 0}</span>
                                    </> :
                                    <>
                                        <span className="text-18px text-[var(--color-neutral-400)]">You must be logged for bids</span>
                                        <Link to="/auth/login" className="mt-[10px]">
                                            <Button>Sign In</Button>
                                        </Link>
                                    </>

                            }
                        </div>
                        {
                            token ? <Button onClick={() => bidMutation()}>€ {lot.product.nextBid ?? 10}</Button> : <></>
                        }
                        <p className="text-[var(--color-neutral-350)] flex mt-[2rem]">
                            <PhInfo className="min-w-[1.5rem] min-h-[1.5rem] mr-[.5rem]"/>
                            Currency exchange rates are constantly changing; this feature is to be used as a guide price
                            only. All final transactions occur in Euro (€)
                        </p>
                    </div>
                </div>
            </section>
            <section className="wrap grid grid-cols-2 gap-[44px] mt-[4rem]">
                <div>
                    <h3 className="text-18px font-bold">{lot.product.title}</h3>
                    <p className="text-18px mt-[1rem]">
                        {
                            lot.product.description
                        }
                    </p>
                </div>
                <div>
                    <ul className="flex flex-col gap-[12px]">
                        {
                            lot.product.distillery ?
                                <li className="flex items-center justify-between pb-[12px] border-dashed border-0 border-b border-[var(--color-neutral-300)]">
                                    <span className="text-[var(--color-neutral-300)] text-18px">Distillery</span>
                                    <span className="font-bold">{lot.product.distillery}</span>
                                </li> : <></>
                        }
                        {
                            lot.product.age ?
                                <li className="flex items-center justify-between pb-[12px] border-dashed border-0 border-b border-[var(--color-neutral-300)]">
                                    <span className="text-[var(--color-neutral-300)] text-18px">Age</span>
                                    <span className="font-bold">{lot.product.age}</span>
                                </li> : <></>
                        }
                        {
                            lot.product.age ?
                                <li className="flex items-center justify-between pb-[12px] border-dashed border-0 border-b border-[var(--color-neutral-300)]">
                                    <span className="text-[var(--color-neutral-300)] text-18px">Age</span>
                                    <span className="font-bold">{lot.product.age}</span>
                                </li> : <></>
                        }
                        {
                            lot.product.vintage ?
                                <li className="flex items-center justify-between pb-[12px] border-dashed border-0 border-b border-[var(--color-neutral-300)]">
                                    <span className="text-[var(--color-neutral-300)] text-18px">Vitange</span>
                                    <span className="font-bold">{lot.product.vintage}</span>
                                </li> : <></>
                        }
                        {
                            lot.product.region_id ?
                                <li className="flex items-center justify-between pb-[12px] border-dashed border-0 border-b border-[var(--color-neutral-300)]">
                                    <span className="text-[var(--color-neutral-300)] text-18px">Region</span>
                                    <span className="font-bold">{lot.product.region_id}</span>
                                </li> : <></>
                        }
                        {
                            lot.product.bottler ?
                                <li className="flex items-center justify-between pb-[12px] border-dashed border-0 border-b border-[var(--color-neutral-300)]">
                                    <span className="text-[var(--color-neutral-300)] text-18px">Bottler</span>
                                    <span className="font-bold">{lot.product.bottler}</span>
                                </li> : <></>
                        }
                        {
                            lot.product.cask_type ?
                                <li className="flex items-center justify-between pb-[12px] border-dashed border-0 border-b border-[var(--color-neutral-300)]">
                                    <span className="text-[var(--color-neutral-300)] text-18px">Cask type</span>
                                    <span className="font-bold">{lot.product.cask_type}</span>
                                </li> : <></>
                        }
                        {
                            lot.product.strength ?
                                <li className="flex items-center justify-between pb-[12px] border-dashed border-0 border-b border-[var(--color-neutral-300)]">
                                    <span className="text-[var(--color-neutral-300)] text-18px">Bottled Strength</span>
                                    <span className="font-bold">{lot.product.strength}</span>
                                </li> : <></>
                        }
                        {
                            lot.product.bottle_size ?
                                <li className="flex items-center justify-between pb-[12px] border-dashed border-0 border-b border-[var(--color-neutral-300)]">
                                    <span className="text-[var(--color-neutral-300)] text-18px">Bottle Size</span>
                                    <span className="font-bold">{lot.product.bottle_size}</span>
                                </li> : <></>
                        }
                        {
                            lot.product.distillery_status ?
                                <li className="flex items-center justify-between pb-[12px] border-dashed border-0 border-b border-[var(--color-neutral-300)]">
                                    <span className="text-[var(--color-neutral-300)] text-18px">Distillery Status</span>
                                    <span className="font-bold">{lot.product.distillery_status}</span>
                                </li> : <></>
                        }
                    </ul>
                </div>
            </section>
        </>
    )
}