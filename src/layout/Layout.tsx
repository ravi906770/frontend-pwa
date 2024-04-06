import React, { useState } from 'react'

const Header = React.lazy(()=>import("../components/common/Header"))
const Footer = React.lazy(()=>import("../components/common/Footer"))
const MyChatBot = React.lazy(()=>import("../components/common/MyChatbot"))
const BouncingLoader = React.lazy(()=>import("../components/loader/BouncingLoader"))
const Routing = React.lazy(()=>import('../routes/Routing'))

type Props = {}

const Layout = (props: Props) => {

  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <>
    <React.Suspense fallback={<BouncingLoader/>}>
    <Header/>
   
        <main>
       
            <Routing/>
            {/* <MyChatBot/> */}
            
        </main>
       
    <Footer/>
    </React.Suspense>

    </>
  )
}

export default Layout