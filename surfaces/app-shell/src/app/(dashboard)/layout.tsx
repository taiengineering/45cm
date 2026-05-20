// Component Imports
import Providers from '@components/Providers'
import HorizontalLayout from '@layouts/HorizontalLayout'
import Header from '@components/layout/horizontal/Header'
import Navigation from '@components/layout/horizontal/Navigation'
import HorizontalMenu from '@components/layout/horizontal/HorizontalMenu'
import NavbarContent from '@components/layout/horizontal/NavbarContent'
import Footer from '@components/layout/horizontal/Footer'
import FooterContent from '@components/layout/horizontal/FooterContent'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Providers direction='ltr'>
      <HorizontalLayout
        header={<Header><NavbarContent /></Header>}
        navigation={<Navigation><HorizontalMenu /></Navigation>}
        footer={<Footer><FooterContent /></Footer>}
      >
        {children}
      </HorizontalLayout>
    </Providers>
  )
}

export default DashboardLayout
