import { Entidade, EntidadeProps, ErroDeDominio, Id, Militar, MilitarProps } from "common";
import Item, { ItemProps } from "./Item";
import Itens from "./Itens";
import Cautela, { CautelaProps } from "./Cautela";
import Cautelas from "./Cautelas";
import { Militares } from "./Militares";
import Material, { MaterialProps } from "./Material";
import Materiais from "./Materiais";

export interface LivroProps extends EntidadeProps {
  itens: ItemProps[];
  materiais:MaterialProps[];
  cautelas: CautelaProps[];
  militares: MilitarProps[];
}

export type ItensTabeladoPorCategoria = {
  categoria: string,
  todos: number,
  disponiveis: number,
  cautelados: number
}

export default class Livro extends Entidade<Livro, LivroProps> {
  readonly itens: Itens;
  readonly materiais: Materiais;
  readonly cautelas: Cautelas;
  readonly militares: Militares;

  constructor(props: LivroProps) {
    super(props);
    this.itens = new Itens(props.itens);
    this.materiais = new Materiais(props.materiais);
    this.cautelas = new Cautelas(props.cautelas);
    this.militares = new Militares(props.militares);
  }

  get itensCautelados(): Itens {
    return this.cautelas.todosItens;
  }

  get materiaisCautelados():Materiais {
    return this.cautelas.todosMateriais;
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

  get materiaisDisponiveis(): Materiais {
    return new Materiais(
      this.materiais.todos.map(material => {
        const [materialCautelado] = this.materiaisCautelados.getMaterialExistenteEIndex(material)
        if (materialCautelado) {
          const quantidade = material.quantidade.valor - materialCautelado.quantidade.valor
          return {...material.props,quantidade}
        } else {
          return material.props
        }
      }).filter(m => m.quantidade > 0)
    )
  }

  get itensTabeladosPorCategoria(): ItensTabeladoPorCategoria[] {
    
    const itensCautelados = this.itensCautelados.porCategorias
    const itensDisponiveis = this.itensDisponiveis.porCategorias
    const itensExistentes = this.itens.porCategorias

    const itens =itensExistentes.map((i) => ({
      categoria: i.categoria.nome.completo,
      todos: i.itens.length,
      cautelados: itensCautelados.find(j => j.categoria.igual(i.categoria))?.itens.length || 0,
      disponiveis: itensDisponiveis.find(j => j.categoria.igual(i.categoria))?.itens.length || 0
    }))

    const materiaisCautelados = this.materiaisCautelados.todos
    const materiaisDisponiveis = this.materiaisDisponiveis.todos
    const materiaisExistentes = this.materiais.todos

    const materiais = materiaisExistentes.map((i) => ({
      categoria:i.nomeCategoria.completo,
      todos:i.quantidade.valor,
      cautelados:materiaisCautelados.find(j => j.nomeCategoria.completo === i.nomeCategoria.completo)?.quantidade.valor || 0,
      disponiveis: materiaisDisponiveis.find(j => j.nomeCategoria.completo === i.nomeCategoria.completo)?.quantidade.valor || 0
    }))

    return itens.concat(materiais)
  }

  novaCautela(militar: Militar, itens: Item[],materiais:Material[]): Livro {
    if (!militar) throw new ErroDeDominio("É necessário um Militar para criar Cautela.")
      const itensValidado = this.novaCautelaItens(...itens)
    const materiaisValidado = this.novaCautelaMateriais(...materiais)
    if (!itensValidado.length && !materiaisValidado.length) throw new ErroDeDominio("É necessário ao menos um material para criar Cautela")
    const novaCautela = new Cautela({
      itens:itensValidado,
      materiais:materiaisValidado,
      militar:militar.props,
    })
    return this.clone({
      ...this.props,
      cautelas:[...this.cautelas.props, novaCautela.props]
    })
    }

  private novaCautelaItens(...itens:Item[]):ItemProps[] {
    const itensExistentes = this.itens.intersecaoCom(itens);
    if (itensExistentes.length === itens.length) {
      const itensCautelados = this.itensCautelados.intersecaoCom(itens);
      if (itensCautelados.length === 0) {
        return itens.map((i) => i.props)
      }
      const msg = itensCautelados.todos.map((i) => i.nome).join(", ");
      throw new ErroDeDominio(`Material já cautelado ${msg}`);
    }
    const itensInexistentes = itens.filter(
      (i) => !itensExistentes.todos.map(Itens.IdItem).includes(i.id.valor),
    );
    const msg = itensInexistentes.map((i) => i.nome).join(", ");
    throw new ErroDeDominio(`Material inexistente ${msg}`);
  }

  private novaCautelaMateriais(...materiais:Material[]):MaterialProps[] {
    if (materiais.every(m => this.materiaisDisponiveis.contem(m))) {
      return materiais.map(m => m.props)
    } else {
      const materiaisInexistentes = materiais.filter(
        m => !this.materiaisDisponiveis.contem(m)
      )
      const msg = materiaisInexistentes.map((m) => m.nome).join(", ");
      throw new ErroDeDominio(`Material inexistente ou cautelado ${msg}`);
    }
  }

  fecharCautela(cautela: Cautela | Id | string): Livro {
    return new Livro({
      ...this.props,
      cautelas: this.cautelas.descautelar(cautela).props,
    });
  }

  inserirItem(item:Material | Item):Livro {
    return item instanceof Material ? this.inserirMaterial(item) : this.adicionarItem(item)
  }

  removerItem(item:Material | Item):Livro {
    return item instanceof Material ? this.excluirMaterial(item) : this.excluirItem(item)
  }

  editarItem(item:Material | Item):Livro {
    return item instanceof Material ? this.editarMaterial(item) : this.modificarItem(item)
  }

  private adicionarItem(item: Item): Livro {
    if (this.itens.porCategoria(item.categoria).todos.some(i => i.numeroDeSerie.completo === item.numeroDeSerie.completo)) throw new ErroDeDominio("Número de série já incluído na categoria")
    if (!this.itens.contem(item)) {
      return this.clone({
        ...this.props,
        itens: this.itens.incluir(item).props,
      });
    }
    throw new ErroDeDominio("Material já incluído");
  }

  private excluirItem(item: Item): Livro {
    if (this.itens.contem(item)) {
      if (!this.itensCautelados.contem(item)) {
        return this.clone({
          ...this.props,
          itens: this.itens.excluir(item).props,
        });
      }
      throw new ErroDeDominio("O Material está cautelado");
    }
    return this;
  }

  private modificarItem(item: Item): Livro {
    if (this.itens.contem(item)) {
      const itens = this.itens.excluir(item).incluir(item).props
      if (this.cautelas.todosItens.contem(item)) {
        const cautelas = this.cautelas.todas.map(cautela => {
          if (cautela.itens.contem(item)) {
            const itensCautela = cautela.itens.excluir(item).incluir(item).props
            return cautela.clone({
              ...cautela.props,
              itens: itensCautela
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

  private inserirMaterial(material:Material):Livro {
    return this.clone({
      ...this.props,
      materiais:this.materiais.incluir(material).props
    })
  }

  private excluirMaterial(material:Material):Livro {
    if (this.materiaisDisponiveis.contem(material)) {
      return this.clone({
        ...this.props,
        materiais:this.materiais.excluir(material).props
      })
    } else {
      throw new ErroDeDominio("Material cautelado")
    }
  }

  private editarMaterial(material:Material): Livro {
    if (this.materiais.existe(material)) {
      const [materialCautelado] = this.materiaisCautelados.getMaterialExistenteEIndex(material)
      if (materialCautelado) {
        if (materialCautelado.quantidade.menorOuIgual(material.quantidade)) {
          const cautelas = this.cautelas.todas.map(cautela => {
            if (cautela.materiais.categorias.includes(material.nomeCategoria.completo)) {
              const materiaisCautela = cautela.materiais.editarNome(material).props
              return cautela.clone({
                ...cautela.props,
                materiais: materiaisCautela
              }).props
            } else return cautela.props
          })
        return this.clone({
          ...this.props,
          materiais:this.materiais.editar(material).props,
          cautelas
        })
      } else {
        throw new ErroDeDominio("Material cautelado")
      }
    }
  else {
    return this.clone({
      ...this.props,
      materiais:this.materiais.editar(material).props,
    })
    }
    } else {
      throw new ErroDeDominio("Material inexistente")
    }
  }

  inserirMilitar(militar: Militar): Livro {
    if (!this.militares.contem(militar)) {
      return this.clone({
        ...this.props,
        militares: this.militares.incluir(militar).props,
      });
    }
    throw new ErroDeDominio("Militar já incluído");
  }

  excluirMilitar(militar: Militar): Livro {
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

  editarMilitar(militar: Militar): Livro {
    if (this.militares.contem(militar)) {
      const militares = this.militares.excluir(militar).incluir(militar).props
      if (this.cautelas.todosMilitares.contem(militar)) {
        const cautelas = this.cautelas.todas.map(c => {
          c.militar.igual(militar)
          return c.clone({
            ...c.props,
            militar: militar.props
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
