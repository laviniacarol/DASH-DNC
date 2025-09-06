import { useState, useEffect } from "react";
import { InputProps } from "@/types";

export const useFormValidation = (inputs: InputProps[]) => {
  const [formValues, setFormValues] = useState<string[]>(
    inputs.map((input) => String(input.value ?? ""))
  );
  const [formValid, setFormValid] = useState<boolean>(false);

  useEffect(() => {
    const allFieldsValid = inputs.every((input, index) => {
      const value = formValues [index]
      if (input.required && !value) {
        return false
      }
      if (input.type === "email") {
        return /\S+@\S+\.\S+/.test(formValues[index]);
      }
      if (input.type === "password") {
        return formValues[index].length > 7;
      }
      return true;
    });
    setFormValid(allFieldsValid);
  }, [formValues, inputs]);

  const handleChange = (index: number, value: string): void => {
    setFormValues((prevValues) => {
      const newValues = [...prevValues];
      newValues[index] = value;
      return newValues;
    });
  };

  return { formValues, formValid, handleChange };
};
