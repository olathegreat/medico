// type NavProps = {

// }  
type NavLinks ={
    title: String,
    link: String
}

function Nav() {
    const navLinks:NavLinks[] = [
        {
            title: "Home",
            link: "/",
        },
        {
            title: "About",
            link: "/about"
        },
        {
            title: "All Doctors",

            link: "/doctors"
        },
        {
            title: "Contact",
            link: "/contact"
        },
       
    ]
  return (
    <nav className="font-bold font-sans w-full bg-blue-500 flex py-4">
       <div >

       </div>

       <div>
        
       </div>
    </nav>
  )
}



export default Nav
