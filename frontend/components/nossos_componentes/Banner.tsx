import { Button } from "../shadcnui/button";

function Banner() {
  return (
    <div className="h-[calc(100vh-64px)] w-full bg-blue-900 px-[76px] py-[56px] bg-cover bg-center items-" style={{ backgroundImage: 'url(background.png)' }}>
        <div className="w-full h-1/2">
            <h1 className="text-[48px] w-1/4 text-white font-extrabold">Central da Solidariedade</h1>
        </div>
        <div className="w-full h-1/2 flex items-end justify-end flex-col gap-4">
            <p className="w-2/5 text-[22px] text-white font-semibold">Unindo forças para transformar vidas com solidariedade e dignidade.</p>
            <Button className="bg-[#DD5656] hover:bg-[#BA3E3E] h-16 w-64 rounded-2xl text-[24px]">Quero Doar!</Button>
        </div>
    </div>
  );
}
export default Banner;