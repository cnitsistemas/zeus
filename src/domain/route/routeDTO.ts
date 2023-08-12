import { OptionBase } from "chakra-react-select";

export interface RouteOption extends OptionBase {
  label: string;
  value: string;
}

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
