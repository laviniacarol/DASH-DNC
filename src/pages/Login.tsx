import { Box, Container, Grid } from '@mui/material'
import { BannerImage, FormComponent, Logo, StyledH1, StyledP } from '../components'
import { pxToRem, jwtExpirationDateConverter } from '@/utils'
import React, { ChangeEvent, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import Cookies from 'js-cookie'

// hooks
import { useFormValidation, usePost } from '@/hooks'

// types
import { DecodedJWT, MessageProps, LoginData, LoginPostData } from '@/types'

//REDUX
import { useSelector } from "react-redux";
import { RootState } from "@/redux";

function Login() {
  const navigate = useNavigate()
  const { email, message } = useSelector((state: RootState) => state.createProfile);
  const inputs = [
    { type: 'email', placeholder: 'Email' },
    { type: 'password', placeholder: 'Senha' }
  ]

  const { data, loading, error, postData } = usePost<LoginData, LoginPostData>('login')
  const { formValues, formValid, handleChange } = useFormValidation(inputs)

  const handleMessage = (): MessageProps => {
    if (!error) return { msg: message ?? '', type: 'success' }
    switch (error) {
      case 401:
        return { msg: 'Email e/ou senha inválidos', type: 'error' }
      default:
        return {
          msg: 'Não foi possível realizar a operação. Entre em contato com o suporte.',
          type: 'error',
        }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await postData({
      email: String(formValues[0]),
      password: String(formValues[1])
    })
  }

 useEffect(() => {
  if (data?.jwt_token) {
    const decoded: DecodedJWT = jwtDecode<DecodedJWT>(data.jwt_token)
  Cookies.set('Authorization', data.jwt_token, {
  expires: jwtExpirationDateConverter(decoded.exp)
})
    navigate('/home')
  }
}, [data, navigate])

useEffect(() => {
  if (message) {
    handleChange(0, email)
  }
}, [email])

  return (
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
            <Box sx={{ marginBottom: pxToRem(24) }}>
              <Logo height={41} width={100} />
            </Box>

            <Box sx={{ marginBottom: pxToRem(24) }}>
              <StyledH1 color="inherit">Bem-vindo</StyledH1>
              <StyledP color="inherit">Digite seu email e senha para logar</StyledP>
            </Box>

            <FormComponent
              input={inputs.map((input, index) => ({
                type: input.type,
                placeholder: input.placeholder,
                value: formValues[index] || '',
                onChange: (e: ChangeEvent<HTMLInputElement>) =>
                  handleChange(index, e.target.value)
              }))}
              button={[
                {
                  className: 'primary',
                  disabled: !formValid || loading,
                  type: 'submit',
                  onClick: handleSubmit,
                  children: loading ? 'Aguarde' : 'Login',
                },
              ]}
              message={handleMessage()}
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
  )
}

export default Login
