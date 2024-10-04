import ListaDeErros from "../../components/ListaDeErros"
import NavBar from "../../components/NavBar"
import SideBar from "../../components/SideBar"


export default function layout({children}:{
    children:React.ReactNode
}) {
    return (
        <div>
            <NavBar />
            <div className="flex flex-row ">
                <SideBar/>
                <div className="p-5 flex flex-row justify-center grow">
                    {children}
                </div>
            </div>
            <ListaDeErros />
        </div>
    )
}