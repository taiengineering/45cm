import type { Mode, Skin, Layout, LayoutComponentPosition, LayoutComponentWidth } from '@core/types'

type Navbar = {
  type: LayoutComponentPosition
  contentWidth: LayoutComponentWidth
  floating: boolean
  detached: boolean
  blur: boolean
}

type Footer = {
  type: LayoutComponentPosition
  contentWidth: LayoutComponentWidth
  detached: boolean
}

export type Config = {
  templateName: string
  homePageUrl: string
  settingsCookieName: string
  mode: Mode
  skin: Skin
  semiDark: boolean
  layout: Layout
  layoutPadding: number
  navbar: Navbar
  contentWidth: LayoutComponentWidth
  compactContentWidth: number
  footer: Footer
  disableRipple: boolean
}

const themeConfig: Config = {
  templateName: '45cm',
  homePageUrl: '/home',
  settingsCookieName: '45cm-settings',
  mode: 'dark',
  skin: 'default',
  semiDark: false,
  layout: 'horizontal',
  layoutPadding: 24,
  compactContentWidth: 1440,
  navbar: {
    type: 'fixed',
    contentWidth: 'wide',
    floating: false,
    detached: false,
    blur: true
  },
  contentWidth: 'wide',
  footer: {
    type: 'static',
    contentWidth: 'wide',
    detached: false
  },
  disableRipple: false
}

export default themeConfig
