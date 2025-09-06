import { useContext, ChangeEvent, useEffect } from "react";
import { AppThemeContext } from "@/contexts/AppThemeContext";

// COMPONENTS
import { Container, Grid } from "@mui/material";
import {
  Header,
  CardComponent,
  FormComponent,
  StyledH2,
  StyledButton,
} from "@/components";

// HOOK
import { useFormValidation, useGet } from "@/hooks";

// SERVICES
import { logout } from "@/services";

// TYPES
import { InputProps, ProfileData } from "@/types"; // removi os que não estavam sendo usados

function Profile() {
  const themeContext = useContext(AppThemeContext);

  // HOOKS
  const {
    data: profileData,
    loading: profileLoading,
    error: profileError,
  } = useGet<ProfileData[]>("profile");

  useEffect(() => {
    if (profileData) {
      handleChange(0, profileData.name);
      handleChange(1, profileData.email);
      handleChange(2, profileData.phone);
    }
  }, [profileData]);

  // FORM AREA
  const inputs: InputProps[] = [
    { name: "name", type: "text", placeholder: "Nome", required: true },
    { name: "email", type: "email", placeholder: "Email", disabled: true },
    { name: "phone", type: "tel", placeholder: "Telefone", required: true },
  ];

  const { formValues, formValid, handleChange } = useFormValidation(inputs);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Atualizar perfil:", formValues);
  };

  const handleDelete = async () => {
    confirm("Tem certeza que deseja excluir sua conta?");
  };

  return (
    <>
      <Header />

      <Container className="mb-2" maxWidth="lg">
        <Grid container spacing={4}>
          {/* FORMULÁRIO DE PERFIL */}
          <Grid item xs={12} sm={6}>
            <CardComponent>
              <StyledH2 className="mb-1" color="inherit">
                Seus Dados
              </StyledH2>
              <FormComponent
                input={inputs.map((input, index) => ({
                  ...input,
                  type: input.type,
                  placeholder: input.placeholder,
                  value: formValues[index] || "",
                  onChange: (e: ChangeEvent<HTMLInputElement>) =>
                    handleChange(index, e.target.value),
                }))}
                button={[
                  {
                    className: "primary",
                    disabled: !formValid,
                    type: "submit",
                    onClick: handleSubmit,
                    children: "Atualizar meu perfil",
                  },
                  {
                    className: "alert",
                    type: "button",
                    onClick: handleDelete,
                    children: "Excluir minha conta",
                  },
                ]}
              />
            </CardComponent>
          </Grid>

          {/* CONFIGURAÇÕES */}
          <Grid item xs={12} sm={6}>
            <CardComponent>
              <StyledH2 className="mb-1" color="inherit">
                Definições de conta
              </StyledH2>
              <StyledButton
                className="primary mb-1"
                onClick={themeContext?.toggleTheme}
              >
                Trocar para tema{" "}
                {themeContext?.appTheme === "light" ? "escuro" : "claro"}
              </StyledButton>

              <StyledButton className="alert" onClick={logout}>
                Logout
              </StyledButton>
            </CardComponent>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Profile;
