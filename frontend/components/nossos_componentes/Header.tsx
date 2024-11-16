import { Button } from "../shadcnui/button";

function Header(){
    return (
        <header className="h-16 w-full px-[76px] flex flex-row items-center justify-between">
            <h1>Central da Solidariedade</h1>
            <div className="flex flex-row w-2/5 justify-between items-center h-full">
                <p>Quem Somos?</p>
                <p>Nossos parceiros</p>
                <Button className="bg-[#DD5656] hover:bg-[#BA3E3E]">Doar Agora!</Button>
            </div>
        </header>
    )
}
export default Header;