import {Logotype} from "src/shared/icons";
import {Link} from "react-router-dom";

export const LogotypeLink = () => (
    <Link to="/" style={{lineHeight: "0"}}>
        <Logotype></Logotype>
    </Link>
)