import { Container, Grid } from "@mui/material";
import {
  Header,
  CardComponent,
  CustomTable,
  FormComponent,
  StyledH2,
  StyledButton,
  StyledP,
} from "@/components";

import { useState, useEffect, ChangeEvent } from "react";
import { useFormValidation, useGet, usePost, useDelete } from "@/hooks";
import { InputProps, LeadsData, LeadsPostData, MessageProps } from "@/types";

function Leads() {
  // HOOKS dentro do componente

  const {
    data: leadsData,
    loading: leadsLoading,
    error: leadsError,
    getData: getLeads,
  } = useGet<LeadsData[]>("leads");

  const { deleteData: leadsDeleteData, loading: leadsDeleteLoading } =
    useDelete("leads/delete"); 

  // FORM STATE
  const [createMessage, setCreateMessage] = useState<MessageProps>({
    type: "success",
    msg: "",
  });

  const clearMessage = () => {
    setTimeout(() => setCreateMessage({ type: "success", msg: "" }), 3000);
  };

  const {
    data: createLeadsData,
    error: createLeadsError,
    loading: createLeadsLoading,
    postData: createLeadsPostData,
  } = usePost<LeadsPostData, LeadsPostData>("leads/create");

  useEffect(() => {
    if (createLeadsData) {
      setCreateMessage({
        type: "success",
        msg: "Lead cadastrado com sucesso",
      });
      getLeads();
      clearMessage();
    } else if (createLeadsError) {
      setCreateMessage({
        type: "error",
        msg: "Não foi possível cadastrar o lead, tente novamente.",
      });
      clearMessage();
    }
  }, [createLeadsData, createLeadsError]);

  const inputs: InputProps[] = [
    { name: "name", type: "text", placeholder: "Nome", required: true },
    { name: "email", type: "email", placeholder: "Email", required: true },
    { name: "phone", type: "tel", placeholder: "Telefone", required: true },
  ];

  const { formValues, formValid, handleChange } =
    useFormValidation(inputs);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload: LeadsPostData = {
      name: String(formValues[0]),
      email: String(formValues[1]),
      phone: String(formValues[2]),
    };

    console.log("Payload:", payload);

    await createLeadsPostData(payload);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Tem certeza que deseja excluir seu lead?")) {
      try {
        await leadsDeleteData({ params: { id } });
        alert("Lead deletado com sucesso.");
        getLeads(); 
      } catch (e) {
        alert(
          "Não foi possível excluir o lead, entre em contato com o suporte."
        );
      }
    }
  };

  return (
    <>
      <Header />
      <Container className="mb-2" maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={7}>
            <CardComponent
              className={leadsLoading ? "skeleton-loading skeleton-loading-mh-2" : ""}
            >
              {!leadsError && (
                <>
                  <StyledH2 color="inherit" className="mb-1">
                    Meus Leads
                  </StyledH2>
                  {leadsData?.length ? (
                    <CustomTable
                      headers={["Nome", "Email", "Telefone", ""]}
                      rows={leadsData.map((lead) => [
                        <StyledP color="inherit">{lead.name}</StyledP>,
                        <StyledP color="inherit">{lead.email}</StyledP>,
                        <StyledP color="inherit">{lead.phone}</StyledP>,
                        <StyledButton
                          className="borderless-alert"
                          onClick={() => handleDelete(lead.id)}
                          disabled={leadsDeleteLoading}
                        >
                          Excluir
                        </StyledButton>,
                      ])}
                    />
                  ) : (
                    <StyledP color="inherit">Nenhum lead cadastrado.</StyledP>
                  )}
                </>
              )}
            </CardComponent>
          </Grid>

          <Grid item xs={12} sm={5}>
            <CardComponent>
              <StyledH2 color="inherit" className="mb-1">
                Cadastrar Leads
              </StyledH2>
              <FormComponent
                input={inputs.map((input, index) => ({
                  ...input,
                  value: formValues[index] || "",
                  onChange: (e: ChangeEvent<HTMLInputElement>) =>
                    handleChange(index, e.target.value),
                }))}
                button={[
                  {
                    className: "primary",
                    disabled: !formValid || createLeadsLoading || leadsDeleteLoading,
                    type: "submit",
                    onClick: handleSubmit,
                    children: "Cadastrar Lead",
                  },
                ]}
                message={createMessage}
              />
            </CardComponent>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Leads;
