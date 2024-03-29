import c from "./style.module.scss";
import {Link} from "react-router-dom";
import {Button} from "src/features/button";
import {Ellipse, ProfileFill, SearchOutline} from "src/shared/icons";
import {LogotypeLink} from "src/features/logotype_link";
import {useAuth} from "@entities/auth_provider";

export const Header = () => {
    const {token, logout} = useAuth();

    return (
        <header className={c.header}>
            <LogotypeLink></LogotypeLink>
            <Link to="/catalog" className="ml-[1rem]">
                <Button>
                    Live Auction
                    <div className="svgContainer">
                        <Ellipse></Ellipse>
                    </div>
                </Button>
            </Link>
            <nav className={c.header__nav}>
                <ul>
                    <li><Link to="">Past auctions</Link></li>
                    <li><Link to="">Sell a Whisky</Link></li>
                    <li><Link to="">Contact Us</Link></li>
                </ul>
            </nav>
            <Button.Icon className="ml-auto">
                <div className="svgContainer">
                    <SearchOutline/>
                </div>
            </Button.Icon>
            {
                token ?
                    <>
                        <Link to="/profile">
                            <Button>
                                My Profile
                                <div className="svgContainer">
                                    <ProfileFill />
                                </div>
                            </Button>
                        </Link>
                        <div>
                            <Button onClick={() => logout()}>
                                Logout
                            </Button>
                        </div>
                    </> :
                    <>
                        <Link to="/auth/login">
                            <Button>
                                Sign In
                            </Button>
                        </Link>
                    </>
            }
        </header>
    )
}