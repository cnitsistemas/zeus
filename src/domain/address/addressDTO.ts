interface Address {
  street: String;
  numero: String;
  complemento: String;
  reference: String;
  neighborhood: String;
  cep: String;
  city: String;
  state: String;
  type: Number;
  erro: String;
}
export const mapAddressByCEP = (data: Address) => {
  return {
    main: data["street"],
    number: "",
    complement: data["complemento"],
    reference: "",
    neighborhood: data["neighborhood"],
    cep: data["cep"],
    city: data["city"],
    state: data["state"],
    type: 0,
    error: data["erro"],
  };
};
