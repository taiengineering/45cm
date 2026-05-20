// Component Imports
import Providers from '@components/Providers'
import VerticalLayout from '@layouts/VerticalLayout'
import Navigation from '@components/layout/vertical/Navigation'
import Navbar from '@components/layout/vertical/Navbar'
import NavbarContent from '@components/layout/vertical/NavbarContent'
import Footer from '@components/layout/vertical/Footer'
import FooterContent from '@components/layout/vertical/FooterContent'

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const direction = 'ltr'

  return (
    <Providers direction={direction}>
      <VerticalLayout
        navigation={<Navigation />}
        navbar={<Navbar><NavbarContent /></Navbar>}
        footer={<Footer><FooterContent /></Footer>}
      >
        {children}
      </VerticalLayout>
    </Providers>
  )
}

export default Layout
