import { StyledButton} from '@/components'
import { render } from '@testing-library/react'
import { DefaultTheme } from 'styled-components';
import { ThemeProvider } from 'styled-components'
import { themeList } from '../../resources/themesList'

describe('StyledButton', () => {
  const renderComponent = (theme: DefaultTheme,className?: string, props = {}) =>
    render(
      <ThemeProvider theme={theme}>
        <StyledButton className={className} {...props}/>
      </ThemeProvider>
    )

  themeList.forEach(({ name, theme }) => {
    describe(`${name}`, () => {
        it('it should match the spnapshot with alert class', () => {
        const { asFragment } = renderComponent(theme, 'alert')
        expect(asFragment()).toMatchSnapshot()
      })
         it('it should match the spnapshot with primary class', () => {
        const { asFragment } = renderComponent(theme, 'primary')
        expect(asFragment()).toMatchSnapshot()
      })
        it('it should match the spnapshot with borderless alert class', () => {
        const { asFragment } = renderComponent(theme, 'borderless-alert')
        expect(asFragment()).toMatchSnapshot()
      })
          it('it should match the spnapshot with disabled class', () => {
        const { asFragment } = renderComponent(theme, 'primary', { disabled: true})
        expect(asFragment()).toMatchSnapshot()
      })
    })
  })
})