import { AvatarList, CardComponent, Header } from "@/components"
import { Container } from "@mui/system"
import { currencyConverter } from "@/utils"

function Home() {
  const mockListData = [
    {
      avatar: '/dnc-avatar.svg',
      name: 'Nome Sobrenome 1',
      subtitle: currencyConverter(3434.54)
    },
     {
      avatar: '/dnc-avatar.svg',
      name: 'Nome Sobrenome 2',
      subtitle: 'R$ 2.000,00'
    },

     {
      avatar: '/dnc-avatar.svg',
      name: 'Nome Sobrenome 3',
      subtitle: 'R$ 3.000,00'
    },
  ]
  return (
    <>
    <Header/>
    <Container maxWidth="lg">
      <CardComponent>CARD</CardComponent>      
      <CardComponent>
        <AvatarList listData={mockListData}/>
      </CardComponent>
    </Container>
    </>
  )
}

export default Home
