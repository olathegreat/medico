import FindBySpeciality from '../components/FindBySpeciality'
import Hero from '../components/Hero'
import Nav from '../components/Nav'
import TopDoctors from '../components/TopDoctors'

function Homepage() {
  return (
    <div className='flex flex-col gap-6'>
        <Nav/>
        <Hero/>
        <FindBySpeciality/>
        <TopDoctors/>
    </div>
  )
}

export default Homepage