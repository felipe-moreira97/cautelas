"use client"
import IncluirMaterialModal from "./IncluirMaterialModal";
import CadastrarMilitarModal from "./CadastrarMilitarModal";
import NovaCautelaModal from "./NovaCautelaModal";


export default function SideBar() {
  return (
    <div className="w-full max-w-[180px] px-1 py-2 flex flex-col gap-2 justify-stretch">
          <NovaCautelaModal />
          <CadastrarMilitarModal />
          <IncluirMaterialModal />
    </div>
  );
}