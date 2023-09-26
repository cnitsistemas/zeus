import { object, string } from "yup";
import { TEXTS } from "./constants/roles";

export const RoleSchema = () => {
    return object().shape({
        name: string()
            .max(TEXTS.NAME.MAX, TEXTS.NAME.ERROR_MAX)
            .required(TEXTS.NAME.ERROR_MSG),
    });
} 