import { useContext, ChangeEvent, useEffect, useState } from "react";
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
import { useFormValidation, useGet, usePut, useDelete } from "@/hooks";

// SERVICES
import { logout } from "@/services";

// TYPES
import {
  InputProps,
  ProfileData,
  MessageProps,
  ProfileEditableData,
} from "@/types"; // removi os que não estavam sendo usados
import Cookies from "js-cookie";

function Profile() {
  const themeContext = useContext(AppThemeContext);

  // HOOKS
  const [upadateMessage, setUpdateMessage] = useState<MessageProps>({
    type: "success",
    msg: "",
  });

  const clearMessage = () => {
    setTimeout(() => {
      setUpdateMessage({
        type: "success",
        msg: "",
      });
    }, 3000);
  };

  const {
    data: profileData,
    loading: profileLoading,
    error: profileError,
  } = useGet<ProfileData[]>("profile");

  const {
    data: profileUpdateData,
    putData: profilePutData,
    loading: profileUpdateLoading,
    error: profileUpdateError,
  } = usePut<ProfileEditableData>('profile/update', true)

  const {
    deleteData: profileDeleteData,
    loading: profileDeleteLoading,
  } = useDelete("profile/update");



  useEffect(() => {
    if (profileData && profileData.length > 0) {
      handleChange(0, profileData[0].name);
      handleChange(1, profileData[0].email);
      handleChange(2, profileData[0].phone);
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
    await profilePutData({
      name: String(formValues[0]),
      phone: String(formValues[2]),
    });
  };

  const handleDelete = async () => {
    confirm("Tem certeza que deseja excluir sua conta?");
    if(confirm('Tem certeza que deseja excluir sua conta?')) {
     try {
      await profileDeleteData();
      alert('Conta excluída com sucesso.');
      Cookies.remove('Authorization');
      window.location.href = '/';
     } catch (e) {
      alert('Não foi possível excluir a conta, entre em contato com o suporte.');
     }
    }
  };

  useEffect(() => {
    if (profileUpdateData !== null) {
      setUpdateMessage({
        msg: "Perfil atualizado com sucesso!",
        type: "success",
      });
    } else if (profileUpdateError) {
      setUpdateMessage({
        msg: "Não foi possível realizar a operação, entre em contato com o suporte",
        type: "error",
      });
    }
    clearMessage();
  }, [profileUpdateData, profileUpdateError]);

  return (
    <>
      <Header />

      <Container className="mb-2" maxWidth="lg">
        <Grid container spacing={4}>
          {/* FORMULÁRIO DE PERFIL */}
          <Grid item xs={12} sm={6}>
            {!profileError && (
              <CardComponent
                className={
                  profileLoading ? "skeleton-loading skeleton-loading-mh-2" : ""
                }
              >
                {!profileLoading && profileData && (
                  <>
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
                          disabled: !formValid || profileUpdateLoading,
                          type: "submit",
                          onClick: handleSubmit,
                          children: profileUpdateLoading ? 'Aguarde' : 'Atualizar meu perfil',
                        },
                        {
                          className: "alert",
                          disabled: profileLoading,
                          type: "button",
                          onClick: handleDelete,
                          children: profileLoading ? 'Aguarde' : 'Excluir minha conta',
                        },
                      ]}
                      message={upadateMessage}
                    />
                  </>
                )}
              </CardComponent>
            )}
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
function deleteProfile() {
  throw new Error("Function not implemented.");
}

