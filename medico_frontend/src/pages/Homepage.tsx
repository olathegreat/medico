
import BookAppointmentBanner from '../components/BookAppointmentBanner'
import FindBySpeciality from '../components/FindBySpeciality'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import Nav from '../components/Nav'
import TopDoctors from '../components/TopDoctors'


function Homepage() {

  return (
    <div className={`flex flex-col gap-20`}>
        <Nav/>
        <Hero/>
        <FindBySpeciality/>
        <TopDoctors/>
        <BookAppointmentBanner/>
        <Footer/>
    </div>
  )
}

export default Homepage