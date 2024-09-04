export default interface CasoDeUso<E, S, U = any> {
  executar(entrada: E, usuario: U): Promise<S>;
}
