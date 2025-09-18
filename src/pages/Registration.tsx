import { Box, Container } from "@mui/material";
import { Grid } from "@mui/material";
import {
  BannerImage,
  FormComponent,
  Logo,
  StyledH1,
  StyledP,
  StyledUl,
} from "@/components";
import { pxToRem } from "@/utils";
import { ChangeEvent, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

//HOOKS
import { useFormValidation, usePost } from "@/hooks";

//REDUX
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux";
import { setMessage, setProfileData } from "@/redux/slices/createProfile";

//TYPES
import { InputProps } from "@/types";
import { on } from "events";

// Define CreateProfileData type
type CreateProfileData = {
  name: string;
  email: string;
  phone: string;
  password: string;
};

function Registration() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email } = useSelector((state: RootState) => state.createProfile);

  const {
    data,
    loading,
    error,
    postData,
  } = usePost<string, CreateProfileData>('profile/create');


  //FORM STEP1

  const step1Inputs: InputProps[] = [
    { name: "name", type: "text", placeholder: "Nome", required: true },
    { name: "email", type: "email", placeholder: "Email" },
    { name: "phone", type: "tel", placeholder: "Telefone", required: true },
  ];

  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      setProfileData({
        email: String(step1FormValues[1]),
      })
    );
  };

  const {
    formValues: step1FormValues,
    formValid: step1FormValid,
    handleChange: step1FormHandleChange,
  } = useFormValidation(step1Inputs);

  //STEP 2
  const step2Inputs: InputProps[] = [
    { type: "password", placeholder: "Senha" },
  ];

  const handleStep2 = async (e: React.FormEvent) => {
    e.preventDefault();
    await postData({
      name: String(step1FormValues[0]),
      email: String(step1FormValues[1]),
      phone: String(step1FormValues[2]),
      password: String(step2FormValues[0]),
    });
  };

  const {
    formValues: step2FormValues,
    formValid: step2FormValid,
    handleChange: step2FormHandleChange,
  } = useFormValidation(step2Inputs);

  const handleStepInputs = email ? step2Inputs : step1Inputs;
 
   useEffect(() => {
     if (data !== null) {
    dispatch(setMessage('Cadastro realizado com sucesso!'));
       navigate("/")
     } else if (error) {
      alert('Não foi possível realizar o cadastro, tente novamente.');
     }
    }, [data, error, navigate]);



  return (
    <>
      <Box>
        <Grid container>
          <Grid
            item
            xs={12}
            sm={6}
            sx={{
              display: "flex",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <Container maxWidth="sm">
              <Box sx={{ marginBottom: pxToRem(24) }}>
                {" "}
                <Logo height={41} width={100} />{" "}
              </Box>
              <Box sx={{ marginBottom: pxToRem(24) }}>
                <StyledH1 color="inherit">
                  {email ? "Defina sua senha" : "Faça seu cadastro"}
                </StyledH1>
                <StyledP color="inherit">
                  {email
                    ? "Sua senha deve ter"
                    : "Primeiro, diga-nos quem você é"}
                </StyledP>
                {email && (
                  <StyledUl color="inherit">
                    <li>Entre 8 e 16 caracteres;</li>
                    <li>Pelo menos uma letra maiúscula;</li>
                    <li>Pelo menos um caractere especial.</li>
                    <li>Pelo menos um número</li>
                  </StyledUl>
                )}
              </Box>
              <FormComponent
                input={handleStepInputs.map((input, index) => ({
                  type: input.type,
                  placeholder: input.placeholder,
                  value: email
                    ? step2FormValues[index] || ""
                    : step1FormValues[index] || "",
                  onChange: (e: ChangeEvent<HTMLInputElement>) =>
                    email
                      ? step2FormHandleChange(index, e.target.value)
                      : step1FormHandleChange(index, e.target.value),
                }))}
                button={[
                  {
                    className: "primary",
                    disabled: email ? !step2FormValid || loading: !step1FormValid,
                    onClick: email ? handleStep2 : handleStep1,
                    type: "submit",
                    children: email ? "Enviar" : "Próximo",
                  },
                ]}
              />
            </Container>
          </Grid>

          <Grid
            item
            xs={12}
            sm={6}
            sx={{
              display: { xs: "none", sm: "block" },
            }}
          >
            <BannerImage />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Registration;
