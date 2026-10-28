import { Outlet } from "react-router";
import  {Header}  from "@/components/header/Header";
import  {Footer}  from "@/components/footer/Footer";
// ThemeProvider переедет либо сюда, либо в root.tsx (обсудим позже)

export default function MainLayout() {
  return (
    <div className='bg-background text-foreground selection:bg-primary/30 flex min-h-screen flex-col'>
      <Header className='border-dark bg-background text-primary sticky top-0 z-[1000] border-b border-solid px-[3rem] py-[0.5rem] tracking-normal'  />
      

       	 <Outlet /> 

      	{/* </main> */}

      <Footer className='bg-foreground text-background relative z-1000 mt-auto py-[2rem]' />
    </div>
  )
}