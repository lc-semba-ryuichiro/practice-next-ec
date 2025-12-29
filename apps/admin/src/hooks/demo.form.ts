import { createFormHook } from "@tanstack/react-form";

import { fieldContext, formContext } from "./demo.form-context";
import { Select, SubscribeButton, TextArea, TextField } from "../components/demo.FormComponents";

export const { useAppForm } = createFormHook({
  fieldComponents: {
    TextField,
    Select,
    TextArea,
  },
  formComponents: {
    SubscribeButton,
  },
  fieldContext,
  formContext,
});
