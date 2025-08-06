import { HtmlHTMLAttributes } from "react";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>
export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

export type MessageProps = {
    msg: string
    type: 'error' | 'success'
}

export interface FormComponentProps {
    input: InputProps[]
    button: ButtonProps[]
    message?: MessageProps
}