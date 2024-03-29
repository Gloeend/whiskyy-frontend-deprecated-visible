import {Route, Routes} from "react-router-dom";
import {Welcome} from "@pages/profile/components/welcome";

// const initialValue = {
//     setUser: () => {
//     },
//     setToken: () => {
//     }
// }
// const Context = createContext<IAuthProvider>(initialValue);
// const ProfileProvider = useContext();

export const Profile = () => {
    return (
        <Routes>
            <Route path="" element={<Welcome></Welcome>}/>
        </Routes>
    )
}