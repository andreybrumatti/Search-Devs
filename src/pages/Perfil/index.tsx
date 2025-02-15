import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { TbPointFilled } from "react-icons/tb";
import { GrOrganization } from "react-icons/gr";
import { CiLocationOn } from "react-icons/ci";
import { CgLink } from "react-icons/cg";
import { IoIosHeartEmpty, IoIosStarOutline, IoIosPeople } from "react-icons/io";

export function Perfil() {

    const location = useLocation();
    const { userData, repoData } = location.state || null; //Recebe os dados da api, caso o usuario nao exista, o state sera null

    function formatRelativeTime(dateString: string): string { //Funcao para formatar a data, através dos seus milisegundos
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();

        const seconds = Math.floor(diffMs / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const months = Math.floor(days / 30);
        const years = Math.floor(days / 365);

        const rtf = new Intl.RelativeTimeFormat('en'); //Retorna o tempo relativo, baseado nas datas passadas como parametro, em inglês

        if (years > 0) return rtf.format(-years, 'year');
        if (months > 0) return rtf.format(-months, 'month');
        if (days > 0) return rtf.format(-days, 'day');
        if (hours > 0) return rtf.format(-hours, 'hour');
        if (minutes > 0) return rtf.format(-minutes, 'minute');
        return rtf.format(-seconds, 'second');
    }

    const isValidUrl = (url: string) => { //Funcao para verificar se o link é valido, recebendo um link como parametro
        try {
          new URL(url); // Se for um link válido, continua
          return true;
        } catch (error) {
          return false; // Se der erro, significa que o link não é válido
        }
      }

    return (
        <div className="flex flex-col sm:flex-row min-h-screen w-full">
            <section className="h-screen sm:flex-1 flex bg-gray-700 sm:max-w-[600px] w-full flex-col items-center">
                <img
                    className="max-w-60 w-full sm:max-w-64 sm:w-full mt-8"
                    src={userData.avatar_url}
                    alt=""
                />
                <div className="flex flex-col w-full px-10 mt-4">
                    <h1 className="text-3xl text-white">{userData.name}</h1>

                    <span className="text-gray-300 text-lg">@{userData.login}</span>

                    <p className="text-gray-400 max-w-[350px] sm:max-w-[450px] sm:w-full text-justify mt-4">{userData.bio}</p>

                    <div className="mt-2 max-w-[350px] sm:max-w-[450px] sm:w-full flex">
                        <span className="text-gray-300 mr-3 flex items-center">
                            <IoIosPeople className="mr-1" size={22} />
                            {userData.followers} followers
                        </span>
                        <span className="text-gray-300 mr-3 flex items-center">
                            <IoIosHeartEmpty className="mr-1" />
                            {userData.following} following
                        </span>
                        <span className="text-gray-300 flex items-center">
                            <IoIosStarOutline className="mr-1" />
                            {repoData.reduce((totalStars: number, repo: { stargazers_count: number; }) => totalStars + repo.stargazers_count, 0)} stars
                        </span>
                    </div>

                    {userData.company != null ? (
                        <div className="flex items-center mt-4">
                            <GrOrganization color="#fff" />
                            <span className="text-gray-300 ml-3">{userData.company}</span>
                        </div>
                    ) : null}

                    {userData.location != null ? (
                        <div className="flex items-center ">
                            <CiLocationOn color="#fff" size={18} className="right-5" />
                            <p className="text-gray-300 mt-1 ml-3">{userData.location}</p>
                        </div>
                    ) : null}

                    {userData.blog && isValidUrl(userData.blog) ? (
                        <div className="flex items-center ">
                            <CgLink color="#fff" size={22} />
                            <a className="text-gray-300 mt-1 w-24 ml-2" href={userData.blog.startsWith("http") ? userData.blog : `https://${userData.blog}`} target="_blank">My Web Site</a>
                        </div>
                    ) : null}
                    {userData.twitter_username != null ? (<p className="text-gray-300 mt-1">{userData.twitter_username}</p>) : null}
                </div>

                <Link to={'/'}>
                    <button className="mt-6 border-0 px-12 py-2 rounded-md bg-white text-gray-500 cursor-pointer">Voltar</button>
                </Link>
            </section>

            <section className="h-screen sm:flex-1 bg-white w-full px-4 overflow-y-auto max-h-screen">
                {repoData.length > 0 ? (
                    repoData.map((repo: any, index: any) => (
                        <div className="border-b border-gray-300 max-w-[450px] sm:max-w-[700px] mx-auto h-auto mt-4 p-1" key={index}>
                            <h1 className="text-2xl text-gray-500">{repo.name}</h1>
                            <p className="text-gray-500">{repo.description}</p>
                            <div className="mt-2 max-w-[350px] sm:max-w-[450px] sm:w-full flex items-center">
                                <div className="flex items-center">
                                    <IoIosStarOutline className="mr-1" />
                                    <span className="text-gray-500 mr-2">{repo.stargazers_count} stars</span>
                                </div>
                                <span><TbPointFilled color="gray" /></span>
                                <span className="text-gray-500 ml-2">Updated {formatRelativeTime(repo.updated_at)}</span>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex items-center justify-center h-screen w-full">
                        <p className="text-2xl text-gray-500">Usuário não possui repositórios públicos!</p>
                    </div>
                )}
            </section>
        </div>
    )
}