import "./index.css";
import "./_reset.css";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import WebFont from "webfontloader";
import {BrowserRouter} from "react-router-dom";
import {AuthProvider} from "@entities/auth_provider";
import {withCookies} from "react-cookie";
import {ApiProvider} from "@entities/api_provider/ApiProvider.tsx";

WebFont.load({
    google: {
        families: ["Manrope:300,400,500,600,700,800", "sans-serif"]
    }
})


const WithCookie = withCookies(AuthProvider)


ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <WithCookie>
            <ApiProvider>
                <App/>
            </ApiProvider>
        </WithCookie>
    </BrowserRouter>,
)
