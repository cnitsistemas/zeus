interface Address {
  logradouro: String;
  numero: String;
  complemento: String;
  reference: String;
  bairro: String;
  cep: String;
  localidade: String;
  uf: String;
  type: Number;
  erro: String;
}
export const mapAddressByCEP = (data: Address) => {
  return {
    main: data["logradouro"],
    number: "",
    complement: data["complemento"],
    reference: "",
    neighborhood: data["bairro"],
    cep: data["cep"],
    city: data["localidade"],
    state: data["uf"],
    type: 0,
    error: data["erro"],
  };
};
