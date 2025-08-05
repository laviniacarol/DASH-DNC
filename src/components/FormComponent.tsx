import { FormComponentProps } from "@/types";

function FormComponent(props: FormComponentProps) {
    const { input, button, message } = props
    return (
        <form>
            {input.map((inputProps, index) => (
              <input key={index} {...inputProps} />
            ))}
             {button.map((buttonProps, index) => (
              <button key={index} {...buttonProps} />
            ))}
            {
                message && (<div style={{color: message.type === 'error' ? 'red' : 'green'}}>
                    {message.msg}
                </div>)
            }
        </form>
    )
}

export default FormComponent;