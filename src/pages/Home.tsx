import { AvatarList, CardComponent, Header, CustomTable } from "@/components"
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
    </Container>
    </>
  )
}

export default Home
