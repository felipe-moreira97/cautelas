import { Entidade, EntidadeProps, ErroDeDominio, Id, Militar, MilitarProps } from "common";
import Item, { ItemProps } from "./Item";
import Itens from "./Itens";
import Cautela, { CautelaProps } from "./Cautela";
import Cautelas from "./Cautelas";
import { Militares } from "./Militares";

export interface LivroProps extends EntidadeProps {
  itens: ItemProps[];
  cautelas: CautelaProps[];
  militares:MilitarProps[];
}

export type ItensTabeladoPorCategoria = {
  categoria:string,
  todos:number,
  disponiveis:number,
  cautelados:number
}

export default class Livro extends Entidade<Livro, LivroProps> {
  readonly itens: Itens;
  readonly cautelas: Cautelas;
  readonly militares:Militares;

  constructor(props: LivroProps) {
    super(props);
    this.itens = new Itens(props.itens);
    this.cautelas = new Cautelas(props.cautelas);
    this.militares = new Militares(props.militares);
  }

  get itensCautelados(): Itens {
    return this.cautelas.todosItens;
  }

  get itensDisponiveis(): Itens {
    return new Itens(
      this.itens.todos
        .filter(
          (i) =>
            !this.itensCautelados.todos.map(Itens.IdItem).includes(i.id.valor),
        )
        .map((i) => i.props),
    );
  }

  get itensTabeladosPorCategoria():ItensTabeladoPorCategoria[] {
    const cautelados = this.itensCautelados.porCategorias
    const disponiveis = this.itensDisponiveis.porCategorias
    const todos = this.itens.porCategorias

    return todos.map((i) => ({
            categoria: i.categoria.nome.completo,
            todos:i.itens.length,
            cautelados:cautelados.find(j => j.categoria.igual(i.categoria))?.itens.length || 0,
            disponiveis:disponiveis.find(j => j.categoria.igual(i.categoria))?.itens.length || 0
        }))
  } 

  novaCautela(militar: Militar, ...itens: Item[]): Livro {
    const contidos = this.itens.intersecaoCom(itens);
    if (!militar) throw new ErroDeDominio("É necessário um Militar para criar cautela.")
    if (contidos.length === itens.length) {
      const itensCautelados = this.itensCautelados.intersecaoCom(itens);
      if (itensCautelados.length === 0) {
        const novaCautela = new Cautela({
          itens: itens.map((i) => i.props),
          militar: militar.props,
        });
        return this.clone({
          ...this.props,
          cautelas: [...this.cautelas.props, novaCautela.props],
        });
      }
      const msg = itensCautelados.todos.map((i) => i.nome).join(", ");
      throw new ErroDeDominio(`Item já cautelado ${msg}`);
    }
    const naoContidos = itens.filter(
      (i) => !contidos.todos.map(Itens.IdItem).includes(i.id.valor),
    );
    const msg = naoContidos.map((i) => i.nome).join(", ");
    throw new ErroDeDominio(`Item não existente ${msg}`);
  }

  fecharCautela(cautela: Cautela | Id | string): Livro {
    return new Livro({
      ...this.props,
      cautelas: this.cautelas.descautelar(cautela).props,
    });
  }

  inserirItem(item: Item): Livro {
    if (!this.itens.contem(item)) {
      return this.clone({
        ...this.props,
        itens: this.itens.incluir(item).props,
      });
    }
    throw new ErroDeDominio("Item já incluído");
  }

  removerItem(item: Item | Id | string): Livro {
    if (this.itens.contem(item)) {
      if (!this.itensCautelados.contem(item)) {
        return this.clone({
          ...this.props,
          itens: this.itens.excluir(item).props,
        });
      }
      throw new ErroDeDominio("O item está cautelado");
    }
    return this;
  }

  editarItem(item:Item):Livro {
    if (this.itens.contem(item)) {
      const itens = this.itens.excluir(item).incluir(item).props
      if (this.cautelas.todosItens.contem(item)) {
        const cautelas = this.cautelas.todas.map(cautela => {
          if(cautela.itens.contem(item)) {
              const itensCautela = cautela.itens.excluir(item).incluir(item).props
              return cautela.clone({
                ...cautela.props,
                itens:itensCautela
              }).props
          } else return cautela.props
        })
        return this.clone({
          ...this.props,
          itens,
          cautelas
        })
      } else {
        return this.clone({
          ...this.props,
          itens
        })
      }
    } else {
      throw new ErroDeDominio("Material inexistente")
    }
  }

  inserirMilitar(militar:Militar):Livro {
    if (!this.militares.contem(militar)) {
      return this.clone({
        ...this.props,
        militares: this.militares.incluir(militar).props,
      });
    }
    throw new ErroDeDominio("Militar já incluído");
  }

  excluirMilitar(militar:Militar):Livro {
    if (this.militares.contem(militar)) {
      if (!this.cautelas.todosMilitares.contem(militar)) {
        return this.clone({
          ...this.props,
          militares: this.militares.excluir(militar).props,
        });
      }
      throw new ErroDeDominio("O Militar possui cautela aberta");
    }
    return this;
  }

  editarMilitar(militar:Militar):Livro {
    if (this.militares.contem(militar)) {
      const militares = this.militares.excluir(militar).incluir(militar).props
      if (this.cautelas.todosMilitares.contem(militar)) {
        const cautelas = this.cautelas.todas.map(c => {
          c.militar.igual(militar)
          return c.clone({
            ...c.props,
            militar:militar.props
          }).props
        })
        return this.clone({
          ...this.props,
          militares,
          cautelas
        })
      } else {
        return this.clone({
          ...this.props,
          militares
        })
      }
    } else {
      throw new ErroDeDominio("Militar não cadastrado")
    }
  }

}
