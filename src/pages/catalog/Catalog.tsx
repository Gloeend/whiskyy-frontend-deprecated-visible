import {Route, Routes} from "react-router-dom";
import {CatalogPage} from "@pages/catalog/components/catalog_page";
import {CatalogProduct} from "@pages/catalog/components/catalog_product";
import {CatalogApiProvider} from "@pages/catalog/api";

export const Catalog = () => {
    return (
        <CatalogApiProvider>
            <Routes>
                <Route path="/" element={<CatalogPage></CatalogPage>}/>
                <Route path="/:id" element={<CatalogProduct></CatalogProduct>}/>
            </Routes>
        </CatalogApiProvider>
    )
}