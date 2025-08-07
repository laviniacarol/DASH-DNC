import { CardComponent, Header } from "@/components"
import { Container } from "@mui/system"

function Home() {
  return (
    <>
    <Header/>
    <Container maxWidth="lg">
      <CardComponent>CARD</CardComponent>
    </Container>
    </>
  )
}

export default Home
