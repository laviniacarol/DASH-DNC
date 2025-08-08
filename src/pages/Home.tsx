import { AvatarList, CardComponent, CustomChart, Header, CustomTable } from "@/components"
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
  
  const mockTableData = {
    headers: ['Name', 'Email', 'Actions'],
    rows: [ 
      [
        <span>Nome 1</span>,
        <span>nome1@gmail.com</span>,
        <button>ACTION</button>
      ],
           [
        <span>Nome 2</span>,
        <span>nome2@gmail.com</span>,
        <button>ACTION</button>
      ],
           [
        <span>Nome 3</span>,
        <span>nome3@gmail.com</span>,
        <button>ACTION</button>
      ]
    ]

  }



  return (
    <>
    <Header/>
    <Container maxWidth="lg">
      <CardComponent>CARD</CardComponent>      
      <CardComponent>
        <AvatarList listData={mockListData}/>
      </CardComponent>
        <CardComponent>
        <CustomTable 
        headers={mockTableData.headers} 
        rows={mockTableData.rows}/>
      </CardComponent>
      <CardComponent>
        <CustomChart 
        labels={['Jan', 'Fev', 'Mar', 'Abr', 'Mai']} 
        data={[1000.12, 2456.54, 987.32, 654.89, 754.89, 354.89]} 
        type="bar"
        />
      </CardComponent>
    </Container>
    </>
  )
}

export default Home
