export function Footer(){
    return(
        <footer className="py-6 text-center text-gray-500 text-sm md:text-base">
            <p>Todos direitos reservados © {new Date().getFullYear()} - <span className="cursor-pointer hover:text-blue-500 duration-700 transition-all">Edson.Emanoel</span></p>
        </footer>
    )
}