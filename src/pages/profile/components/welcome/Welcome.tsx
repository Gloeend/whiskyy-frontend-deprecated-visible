import {useAuth} from "@entities/auth_provider";
import {ProfileTab} from "@pages/profile/components/welcome/components/profile_tab";
import {LineMdAccount, PhAddressBook} from "src/shared/icons";

export const Welcome = () => {
    const {user} = useAuth();
    return (
        <>
            <section className="wrap mt-[2rem] grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-[1rem]">
                <h1 className="text-56px leading-[3.5rem] font-bold whitespace-nowrap">
                    Good morning, <br/> {user?.name}
                </h1>
                <ProfileTab icon={<LineMdAccount></LineMdAccount>} link="/account">
                    My Account
                </ProfileTab>
                <ProfileTab icon={<PhAddressBook></PhAddressBook>} link="/address-book">
                    Address Book
                </ProfileTab>
                <ProfileTab icon={<PhAddressBook></PhAddressBook>} link="/newsletter">
                    Newsletter
                </ProfileTab>
                <ProfileTab icon={<PhAddressBook></PhAddressBook>} link="/payment">
                    Payment Details
                </ProfileTab>
            </section>
            <section className="wrap mt-[var(--variable-44px)] grid grid-cols-6 gap-[1rem]">
                <ProfileTab counter={0} large={true} icon={<LineMdAccount></LineMdAccount>} link="/account">
                    My Bids
                </ProfileTab>
                <ProfileTab counter={0} large={true} icon={<PhAddressBook></PhAddressBook>} link="/address-book">
                    Favorites
                </ProfileTab>
                <ProfileTab counter={0} large={true} icon={<PhAddressBook></PhAddressBook>} link="/newsletter">
                    My Auctions
                </ProfileTab>
                <ProfileTab counter={0} large={true} icon={<PhAddressBook></PhAddressBook>} link="/payment">
                    Selling Lots
                </ProfileTab>
                <ProfileTab counter={0} large={true} icon={<PhAddressBook></PhAddressBook>} link="/payment">
                    Shopping <br/> Cart
                </ProfileTab>
                <ProfileTab counter={0} large={true} icon={<PhAddressBook></PhAddressBook>} link="/payment">
                    Orders
                </ProfileTab>
            </section>
        </>
    )
}