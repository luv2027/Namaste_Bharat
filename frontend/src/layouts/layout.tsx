import Hero from "../components/Hero";
import  Header  from "../components/header";

const Layout = () => {
  return (
    <div className = "flex flex-col min-h-screen">
      <Header />
      <Hero />
    </div>
  )
}

export default Layout;