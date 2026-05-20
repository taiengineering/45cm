// MUI Imports
import { useTheme } from '@mui/material/styles'

// Type Imports
import type { VerticalMenuContextProps } from '@menu/components/vertical-menu/Menu'

// Component Imports
import HorizontalNav, { Menu, MenuItem, SubMenu } from '@menu/horizontal-menu'
import VerticalNavContent from './VerticalNavContent'

// Hook Imports
import useVerticalNav from '@menu/hooks/useVerticalNav'

// Styled Component Imports
import StyledHorizontalNavExpandIcon from '@menu/styles/horizontal/StyledHorizontalNavExpandIcon'
import StyledVerticalNavExpandIcon from '@menu/styles/vertical/StyledVerticalNavExpandIcon'

// Style Imports
import menuItemStyles from '@core/styles/horizontal/menuItemStyles'
import menuRootStyles from '@core/styles/horizontal/menuRootStyles'
import verticalNavigationCustomStyles from '@core/styles/vertical/navigationCustomStyles'
import verticalMenuItemStyles from '@core/styles/vertical/menuItemStyles'
import verticalMenuSectionStyles from '@core/styles/vertical/menuSectionStyles'

type RenderExpandIconProps = { level?: number }
type RenderVerticalExpandIconProps = { open?: boolean; transitionDuration?: VerticalMenuContextProps['transitionDuration'] }

const RenderExpandIcon = ({ level }: RenderExpandIconProps) => (
  <StyledHorizontalNavExpandIcon level={level}>
    <i className='tabler-chevron-right' />
  </StyledHorizontalNavExpandIcon>
)

const RenderVerticalExpandIcon = ({ open, transitionDuration }: RenderVerticalExpandIconProps) => (
  <StyledVerticalNavExpandIcon open={open} transitionDuration={transitionDuration}>
    <i className='tabler-chevron-right' />
  </StyledVerticalNavExpandIcon>
)

const HorizontalMenu = () => {
  const verticalNavOptions = useVerticalNav()
  const theme = useTheme()
  const { transitionDuration } = verticalNavOptions

  return (
    <HorizontalNav
      switchToVertical
      verticalNavContent={VerticalNavContent}
      verticalNavProps={{
        customStyles: verticalNavigationCustomStyles(verticalNavOptions, theme),
        backgroundColor: 'var(--mui-palette-background-paper)'
      }}
    >
      <Menu
        rootStyles={menuRootStyles(theme)}
        renderExpandIcon={({ level }) => <RenderExpandIcon level={level} />}
        menuItemStyles={menuItemStyles(theme, 'tabler-circle')}
        renderExpandedMenuItemIcon={{ icon: <i className='tabler-circle text-xs' /> }}
        popoutMenuOffset={{
          mainAxis: ({ level }) => (level && level > 0 ? 14 : 12),
          alignmentAxis: 0
        }}
        verticalMenuProps={{
          menuItemStyles: verticalMenuItemStyles(verticalNavOptions, theme),
          renderExpandIcon: ({ open }) => (
            <RenderVerticalExpandIcon open={open} transitionDuration={transitionDuration} />
          ),
          renderExpandedMenuItemIcon: { icon: <i className='tabler-circle text-xs' /> },
          menuSectionStyles: verticalMenuSectionStyles(verticalNavOptions, theme)
        }}
      >
        {/* 홈 */}
        <MenuItem href='/home' icon={<i className='tabler-smart-home' />}>
          홈
        </MenuItem>

        {/* 운영 */}
        <SubMenu label='운영' icon={<i className='tabler-activity' />}>
          <MenuItem href='/studio'>
            <i className='tabler-pencil text-base mie-2' />스튜디오
          </MenuItem>
          <MenuItem href='/queue'>
            <i className='tabler-inbox text-base mie-2' />승인함
          </MenuItem>
          <MenuItem href='/events'>
            <i className='tabler-bolt text-base mie-2' />이벤트
          </MenuItem>
          <MenuItem href='/control'>
            <i className='tabler-adjustments text-base mie-2' />운영 제어
          </MenuItem>
        </SubMenu>

        {/* 브랜드 */}
        <SubMenu label='브랜드' icon={<i className='tabler-palette' />}>
          <MenuItem href='/surfaces'>
            <i className='tabler-world text-base mie-2' />채널 상태
          </MenuItem>
          <MenuItem href='/assets'>
            <i className='tabler-package text-base mie-2' />브랜드 자산
          </MenuItem>
          <MenuItem href='/patterns'>
            <i className='tabler-puzzle text-base mie-2' />브랜드 패턴
          </MenuItem>
          <MenuItem href='/memory'>
            <i className='tabler-database text-base mie-2' />메모리
          </MenuItem>
        </SubMenu>

        {/* 분석 */}
        <SubMenu label='분석' icon={<i className='tabler-chart-bar' />}>
          <MenuItem href='/lifecycle'>
            <i className='tabler-refresh text-base mie-2' />운영 흐름
          </MenuItem>
          <MenuItem href='/campaigns'>
            <i className='tabler-target text-base mie-2' />캔페인
          </MenuItem>
          <MenuItem href='/analytics'>
            <i className='tabler-chart-line text-base mie-2' />애널리틱스
          </MenuItem>
        </SubMenu>

        {/* 설정 */}
        <SubMenu label='설정' icon={<i className='tabler-settings' />}>
          <MenuItem href='/settings'>
            <i className='tabler-plug text-base mie-2' />채널 연동
          </MenuItem>
          <MenuItem href='/queues'>
            <i className='tabler-server text-base mie-2' />시스템
          </MenuItem>
        </SubMenu>
      </Menu>
    </HorizontalNav>
  )
}

export default HorizontalMenu
