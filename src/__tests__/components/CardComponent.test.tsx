import { CardComponent} from '@/components'
import { render } from '@testing-library/react'
import { DefaultTheme } from 'styled-components';
import { ThemeProvider } from 'styled-components'
import { themeList } from '../../resources/themesList'

describe('CardComponent', () => {
  const renderComponent = (theme: DefaultTheme,className?: string) =>
    render(
      <ThemeProvider theme={theme}>
        <CardComponent className={className}/>
      </ThemeProvider>
    )

  themeList.forEach(({ name, theme }) => {
    describe(`${name}`, () => {
      it('it should match the spnapshot without any class', () => {
        const { asFragment } = renderComponent(theme)
        expect(asFragment()).toMatchSnapshot()
      })
        it('it should match the spnapshot with alert class', () => {
        const { asFragment } = renderComponent(theme, 'alert')
        expect(asFragment()).toMatchSnapshot()
      })
         it('it should match the spnapshot with success class', () => {
        const { asFragment } = renderComponent(theme, 'success')
        expect(asFragment()).toMatchSnapshot()
      })
        it('it should match the spnapshot with warning class', () => {
        const { asFragment } = renderComponent(theme, 'warning')
        expect(asFragment()).toMatchSnapshot()
      })
    })
  })
})