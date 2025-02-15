import { createBrowserRouter } from "react-router-dom";

import { Home } from "./pages/Home/index";
import { Notfound } from "./pages/Notfound/index";
import { Perfil } from "./pages/Perfil/index";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/perfil/:username",
        element: <Perfil />
    },

    {
        path: '*',
        element: <Notfound/>
    }
])

export default router;
