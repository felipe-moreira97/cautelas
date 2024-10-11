import { ErroDeDominio } from "common";
import Material, { MaterialProps } from "./Material";

export default class Materiais {
  readonly todos: Material[];

  constructor(props: MaterialProps[]) {
    this.todos = props.map((m) => new Material(m));
  }

  get props(): MaterialProps[] {
    return this.todos.map((i) => i.props);
  }

  get length(): number {
    return this.todos.length;
  }

  get categorias(): string[] {
    return this.todos.map(m => m.nomeCategoria.completo)

  }

  getMaterialExistenteEIndex(material:Material):[Material | undefined,number] {
    const materialExistente = this.todos.find(m => m.nomeCategoria.completo === material.nomeCategoria.completo)
    const index = this.todos.findIndex(m => m.nomeCategoria.completo === material.nomeCategoria.completo)
    return [materialExistente,index]

  }
  incluir(material: Material): Materiais {
    const [materialExistente,index] = this.getMaterialExistenteEIndex(material)
    if (materialExistente) {
      const quantidade = materialExistente.quantidade.valor + material.quantidade.valor
      const materiais = [...this.props];
      materiais.splice(index,1,{
        ...materialExistente.props,
        quantidade
      });
      return new Materiais(materiais);
    }
    else {
      const materiais = [...this.props];
      materiais.push(material.props);
      return new Materiais(materiais);
    }
  }

  excluir(material: Material): Materiais {
    const [materialExistente,index] = this.getMaterialExistenteEIndex(material)
    const materiais = [...this.props];
    if(materialExistente) {
        if(materialExistente.quantidade.maior(material.quantidade)) {
          const quantidade = materialExistente.quantidade.valor - material.quantidade.valor
          materiais.splice(index,1,{
            ...materialExistente.props,
            quantidade
          });
          return new Materiais(materiais);
        } else {
          materiais.splice(index,1);
          return new Materiais(materiais);
        }
    }
    return this;
  }
  editar(material:Material):Materiais {
    const [materialExistente,index] = this.getMaterialExistenteEIndex(material)
    const materiais = [...this.props];
    if(materialExistente) {
      materiais.splice(index,1,{
        ...material.props,
        id:materialExistente.id.valor
      });
      return new Materiais(materiais);
    }
    throw new ErroDeDominio("Material inexistente")
  }
  editarNome(material:Material):Materiais {
    const [materialExistente,index] = this.getMaterialExistenteEIndex(material)
    const materiais = [...this.props];
    if(materialExistente) {
      materiais.splice(index,1,{
        ...materialExistente.props,
        nomeCategoria:material.nomeCategoria.completo
      });
      return new Materiais(materiais);
    }
    throw new ErroDeDominio("Material inexistente")
  }
  contem(material:Material):boolean {
    const [materialExistente] = this.getMaterialExistenteEIndex(material)
      return materialExistente ? materialExistente.quantidade.maiorOuIgual(material.quantidade) : false
  }
  existe(material:Material):boolean {
    const [materialExistente] = this.getMaterialExistenteEIndex(material)
    return !!materialExistente
  }
}
