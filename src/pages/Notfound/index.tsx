import { Link } from "react-router-dom";

export function Notfound(){
    return(
        <div className="flex flex-col items-center justify-center h-screen w-full">
            <p className="text-6xl mb-2">404</p>
            <h1 className="text-3xl font-medium mb-4">Página não encontrada</h1>

            <Link to={"/"} className="text-white border-0 bg-gray-400 py-1 px-2 rounded-sm ">Voltar para home</Link>
        </div>
    )
}