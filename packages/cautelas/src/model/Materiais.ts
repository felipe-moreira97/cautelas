import { Id } from "common";
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

  incluir(material: Material): Materiais {
    if (this.categorias.includes(material.nomeCategoria.completo)) {

    }
    else {
      const materiais = [...this.props];
      materiais.push(material.props);
      return new Materiais(materiais);
    }
  }

  excluir(item: Item | Id | string): Itens {
    const ItemId = Itens.IdItem(item);
    return new Itens(this.props.filter((i) => i.id !== ItemId));
  }

  contem(item: Item | Id | string): boolean {
    const ItemId = Itens.IdItem(item);
    return this.todos.some((i) => i.id.valor === ItemId);
  }

  intersecaoCom(itens: Item[]): Itens {
    return new Itens(
      this.todos
        .filter((i) => itens.map(Itens.IdItem).includes(i.id.valor))
        .map((i) => i.props),
    );
  }

  porCategoria(categoria: Categoria | Id | string): Itens {
    const categoriaId = this.IdCategoria(categoria);
    return new Itens(
      this.todos
        .filter((i) => i.categoria.id.valor === categoriaId)
        .map((i) => i.props),
    );
  }

  get porCategorias(): ItensPorCategoria[] {
    const categorias = this.categorias;
    return categorias.map((categoria) => {
      const itens = this.porCategoria(categoria);
      return {
        categoria,
        itens,
      };
    });
  }

  private IdCategoria(categoria: Categoria | Id | string): string {
    return categoria instanceof Categoria
      ? categoria.id.valor
      : categoria instanceof Id
        ? categoria.valor
        : categoria;
  }

  static IdItem(item: Item | Id | string): string {
    return item instanceof Item
      ? item.id.valor
      : item instanceof Id
        ? item.valor
        : item;
  }
}
