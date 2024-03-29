import {Navigate, Route, Routes} from "react-router-dom";
import Home from "@pages/home/Home.tsx";
import {Header} from "@widgets/header";
import {Auth} from "@pages/auth";
import {FC, PropsWithChildren} from "react";
import {Profile} from "@pages/profile";
import {useAuth} from "@entities/auth_provider";
import {Catalog} from "@pages/catalog";

export const PrivateRoute: FC<PropsWithChildren & { isAuth: boolean; }> = ({children, isAuth}) =>
    isAuth ? children : <Navigate to="/auth/login" replace/>;
export const NonAuthRoute: FC<PropsWithChildren & { isAuth: boolean; }> = ({children, isAuth}) =>
    !isAuth ? children : <Navigate to="/profile" replace/>;

function App() {
    const auth = useAuth();

    return (
        <>
            <Header></Header>
            <main>
                <Routes>
                    <Route path="" element={<Home></Home>}/>
                    <Route path="/auth/*" element={
                        <NonAuthRoute isAuth={!!auth.token}>
                            <Auth></Auth>
                        </NonAuthRoute>
                    }/>
                    <Route path="/profile/*" element={
                        <PrivateRoute isAuth={!!auth.token}>
                            <Profile></Profile>
                        </PrivateRoute>
                    }/>
                    <Route path="/catalog/*" element={<Catalog></Catalog>}/>
                </Routes>
            </main>
            <footer>footer</footer>
        </>
    )
}

export default App;
