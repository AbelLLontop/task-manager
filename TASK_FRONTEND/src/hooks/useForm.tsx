import { useState } from "react";

type typesEvents = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
export const useForm=<T,> (initialForm:T)=>{
  const [form,setForm] = useState<T>(initialForm);
  const handleChange = (e:typesEvents)=>{
    setForm({
      ...form,
      [e.target.name]:e.target.value,
    });
  };
  return {form,setForm,handleChange};
}