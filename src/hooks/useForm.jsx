import { useState } from "react";

export const useForm = (initialObj = {}) => {

    const [form, setForm] = useState(initialObj);

    const serializarform = (form) => {

        const formData = new FormData(form);
        const objetoCompleto = {};

        for (let [name, value] of formData) {
            objetoCompleto[name] = value;
        }

        return objetoCompleto;
    }

    const enviado = (e) => {

        e.preventDefault();

        let curso = serializarform(e.target);

        setForm(curso);
    }

    const change = ({ target }) => {
        const { name, value } = target;

        setForm({
            ...form,
            [name]: value
        });
    }

    return {
        form,
        enviado,
        change
    }

}