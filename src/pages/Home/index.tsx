import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { CiSearch } from "react-icons/ci";

export function Home() {

    const navigate = useNavigate();
    const [username, setUserName] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSearch() {
        setLoading(true);

        if (username.trim() === '') {
            alert('Digite um username válido!')
            setLoading(false);
            return;
        }

        try {
            const responseUser = await axios.get(`https://api.github.com/users/${username.trim()}`)
            const responseRepo = await axios.get(`https://api.github.com/users/${username.trim()}/repos`)

            const userData = responseUser.data;
            const repoData = responseRepo.data;

            if (responseUser.data) {
                navigate(`/perfil/${username}`, { state: { userData, repoData } }); //Navega até perfil, e repassa os dados da api
            }
        } catch (error) {
            alert("Usuário não encontrado! Verifique o nome digitado.");
        } finally {
            setLoading(false);
        }
    };

    return (
        loading ? (
            <div className="flex flex-col items-center justify-center h-screen w-full">
                <p className="text-2xl font-semibold animate-pulse">Carregando...</p>
            </div>
        ) : (
            <div className="flex flex-col items-center justify-center h-screen w-full">
                <div className="max-w-lg w-full flex items-center flex-col justify-center">
                    <span className="text-3xl">Search Devs</span>

                    <div className="flex flex-col sm:flex-row items-center gap-10 sm:gap-2 w-full justify-center">
                        <input
                            type="text"
                            placeholder="Type the username here..."
                            className="border rounded-sm outline-none px-2 py-1 max-w-sm w-full"
                            value={username}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                        <div className="flex  flex-row mr-16 sm:mr-1 items-center relative">
                            <button onClick={handleSearch} disabled={loading} className="border-0 bg-gray-600 py-1 px-2 flex items-center rounded-sm text-white absolute">
                                <CiSearch color="#fff" size={20} className="mr-2"/>
                                Buscar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    )
}