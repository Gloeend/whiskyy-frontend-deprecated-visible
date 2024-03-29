import {Navigate, Route, Routes} from "react-router-dom";
import {Login} from "@pages/auth/components/login";
import {Registration} from "@pages/auth/components/registration";
import {AuthApiProvider} from "@pages/auth/api";
export const Auth = () => {
    return (
        <>
            <AuthApiProvider>
                <Routes>
                    <Route path="/login" element={<Login></Login>}/>
                    <Route path="/registration" element={<Registration></Registration>}/>
                    <Route path="*" element={<Navigate to="/auth/login" />} />
                </Routes>
            </AuthApiProvider>
        </>
    )
}

