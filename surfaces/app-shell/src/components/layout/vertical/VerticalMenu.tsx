// MUI Imports
import { useTheme } from '@mui/material/styles'

// Third-party Imports
import PerfectScrollbar from 'react-perfect-scrollbar'

// Type Imports
import type { VerticalMenuContextProps } from '@menu/components/vertical-menu/Menu'

// Component Imports
import { Menu, MenuItem, MenuSection } from '@menu/vertical-menu'

// Hook Imports
import useVerticalNav from '@menu/hooks/useVerticalNav'

// Styled Component Imports
import StyledVerticalNavExpandIcon from '@menu/styles/vertical/StyledVerticalNavExpandIcon'

// Style Imports
import menuItemStyles from '@core/styles/vertical/menuItemStyles'
import menuSectionStyles from '@core/styles/vertical/menuSectionStyles'

type RenderExpandIconProps = {
  open?: boolean
  transitionDuration?: VerticalMenuContextProps['transitionDuration']
}

type Props = {
  scrollMenu: (container: any, isPerfectScrollbar: boolean) => void
}

const RenderExpandIcon = ({ open, transitionDuration }: RenderExpandIconProps) => (
  <StyledVerticalNavExpandIcon open={open} transitionDuration={transitionDuration}>
    <i className='tabler-chevron-right' />
  </StyledVerticalNavExpandIcon>
)

const VerticalMenu = ({ scrollMenu }: Props) => {
  const theme = useTheme()
  const verticalNavOptions = useVerticalNav()
  const { isBreakpointReached, transitionDuration } = verticalNavOptions
  const ScrollWrapper = isBreakpointReached ? 'div' : PerfectScrollbar

  return (
    <ScrollWrapper
      {...(isBreakpointReached
        ? { className: 'bs-full overflow-y-auto overflow-x-hidden', onScroll: (container: any) => scrollMenu(container, false) }
        : { options: { wheelPropagation: false, suppressScrollX: true }, onScrollY: (container: any) => scrollMenu(container, true) })}
    >
      <Menu
        popoutMenuOffset={{ mainAxis: 23 }}
        menuItemStyles={menuItemStyles(verticalNavOptions, theme)}
        renderExpandIcon={({ open }) => <RenderExpandIcon open={open} transitionDuration={transitionDuration} />}
        renderExpandedMenuItemIcon={{ icon: <i className='tabler-circle text-xs' /> }}
        menuSectionStyles={menuSectionStyles(verticalNavOptions, theme)}
      >
        {/* 운영 */}
        <MenuSection label='운영'>
          <MenuItem href='/' icon={<i className='tabler-smart-home' />}>
            홈
          </MenuItem>
          <MenuItem href='/studio' icon={<i className='tabler-pencil' />}>
            스튜디오
          </MenuItem>
          <MenuItem href='/queue' icon={<i className='tabler-inbox' />}>
            승인함
          </MenuItem>
          <MenuItem href='/events' icon={<i className='tabler-bolt' />}>
            이벤트
          </MenuItem>
        </MenuSection>

        {/* 브랜드 */}
        <MenuSection label='브랜드'>
          <MenuItem href='/surfaces' icon={<i className='tabler-world' />}>
            채널 상태
          </MenuItem>
          <MenuItem href='/assets' icon={<i className='tabler-package' />}>
            브랜드 자산
          </MenuItem>
          <MenuItem href='/patterns' icon={<i className='tabler-puzzle' />}>
            브랜드 패턴
          </MenuItem>
          <MenuItem href='/memory' icon={<i className='tabler-database' />}>
            메모리
          </MenuItem>
        </MenuSection>

        {/* 분석 */}
        <MenuSection label='분석'>
          <MenuItem href='/lifecycle' icon={<i className='tabler-refresh' />}>
            운영 흐름
          </MenuItem>
          <MenuItem href='/campaigns' icon={<i className='tabler-target' />}>
            캔페인
          </MenuItem>
          <MenuItem href='/analytics' icon={<i className='tabler-chart-bar' />}>
            애널리틱스
          </MenuItem>
        </MenuSection>

        {/* 설정 */}
        <MenuSection label='설정'>
          <MenuItem href='/control' icon={<i className='tabler-adjustments' />}>
            운영 제어
          </MenuItem>
          <MenuItem href='/settings' icon={<i className='tabler-settings' />}>
            채널 연동
          </MenuItem>
          <MenuItem href='/queues' icon={<i className='tabler-server' />}>
            시스템
          </MenuItem>
        </MenuSection>
      </Menu>
    </ScrollWrapper>
  )
}

export default VerticalMenu
