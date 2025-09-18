import styled from "styled-components";
import { StyledButton, StyledInput } from "@/components"
import { FormComponentProps } from "@/types";
import { pxToRem } from "@/utils";

export const StyledForm = styled.form`
       display: flex;
       flex-direction: column;
       row-gap: ${pxToRem(16)};
`

function FormComponent(props: FormComponentProps) {
    const { input, button, message } = props
    return (
        <StyledForm>
            {input.map((inputProps, index) => (
              <StyledInput key={index} {...inputProps} />
            ))}
             {button.map((buttonProps, index) => (
              <StyledButton key={index} {...buttonProps} />
            ))}
            {
                message && (<div style={{color: message.type === 'error' ? 'red' : 'green'}}>
                    {message.msg}
                </div>)
            }
        </StyledForm>
    )
}

export default FormComponent;