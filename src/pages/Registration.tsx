import { Box, Container } from '@mui/material'
import { Grid } from '@mui/material'
import { BannerImage, FormComponent, Logo, StyledH1, StyledP, StyledUl } from '@/components'
import { pxToRem } from '@/utils'



function Registration() {
  return (
    <>
      <Box>
        <Grid container>
          <Grid
            item
            xs={12}
            sm={6}
            sx={{
              display: 'flex',
              alignItems: 'center',
              height: '100vh',
            }}
          >
            <Container maxWidth="sm">
              <Box sx={{ marginBottom: pxToRem(24)}}> <Logo height={41} width={100}/> </Box>
            <Box sx={{ marginBottom: pxToRem(24)}}>
              <StyledH1 color="inherit">Faça seu cadastro</StyledH1>
              <StyledP color="inherit">Primeiro, diga-nos quem você é.</StyledP>
              <StyledUl color="inherit">
                <li>Entre 8 e 16 caracteres;</li>
                <li>Pelo menos uma letra maiúscula;</li>
                <li>Pelo menos um caractere especial.</li>
                <li>Pelo menos um número</li>
              </StyledUl>
            </Box>
             <FormComponent 
            input={[
              { type: 'email', placeholder: 'Email'},
              { type: 'password', placeholder: 'Senha'},
            ]} 

            button={[
              { className: 'primary', type: 'submit', children: 'Login'},
            ]}

            message={{
               msg: "Sucesso",
               type: "success"
            }}
            />
            </Container>
          </Grid>

          <Grid
            item
            xs={12}
            sm={6}
            sx={{
            display: { xs: 'none', sm: 'block' },
            }}
          >
            <BannerImage />
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default Registration
