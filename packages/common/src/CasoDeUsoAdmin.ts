import CasoDeUso from "./CasoDeUso";
import ErroUtil, { ErroDeDominio } from "./ErroUtil";

type Usuario = {
  admin?: boolean;
};

export default abstract class CasoDeUsoAdmin<E, S, U extends Usuario = Usuario>
  implements CasoDeUso<E, S, U>
{
  executar(entrada: E, usuario?: any): Promise<S> {
    if (usuario.admin) {
      return this.executarComoAdmin(entrada, usuario);
    }
    throw new ErroDeDominio(
      ErroUtil.msgPadrao("Usuário sem permissão", usuario.admin, usuario),
    );
  }
  abstract executarComoAdmin(entrada: E, usuario?: U): Promise<S>;
}
