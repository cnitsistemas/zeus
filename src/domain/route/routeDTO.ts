export const mapFetchRoutersResponse = (response: any) => {
  return (
    response["data"].map((item: any) => {
      return {
        id: item["id"],
        name: item["nome"],
      };
    }) || []
  );
};
