// Type Imports
import type { ChildrenType, Direction } from '@core/types'

// Context Imports
import { VerticalNavProvider } from '@menu/contexts/verticalNavContext'
import { SettingsProvider } from '@core/contexts/settingsContext'
import ThemeProvider from '@components/theme'

// Config Imports
import themeConfig from '@configs/themeConfig'

type Props = ChildrenType & {
  direction: Direction
}

const Providers = (props: Props) => {
  const { children, direction } = props

  const mode = themeConfig.mode
  const systemMode = (mode === 'system' ? 'dark' : mode) as 'light' | 'dark'

  return (
    <VerticalNavProvider>
      <SettingsProvider settingsCookie={{}} mode={mode}>
        <ThemeProvider direction={direction} systemMode={systemMode}>
          {children}
        </ThemeProvider>
      </SettingsProvider>
    </VerticalNavProvider>
  )
}

export default Providers
