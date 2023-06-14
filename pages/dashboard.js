import Navbar from '../components/Navbar'
import { CheckIcon } from '@heroicons/react/20/solid'
import DashBoardCard from '../components/DashBoardCard'

const datas = [
  {
    header: "Call Doctor",
    img: "./assets/doctor.svg",
    button: "Call Now",
    description: ""
  },
  {
    header: "Book Ambulance",
    img: "./assets/ambulance.svg",
    button: "Book Now",
    description: ""
  },
  {
    header: "Call Fire Force",
    img: "./assets/fire.svg",
    button: "Call Now",
    description: ""
  },
  {
    header: "Medical Records", 
    img: "./assets/doctor.svg",
    button: "View Now",
    description: ""
  }

]

function dashboard() {
  return (
    <div>
        <Navbar />
      <div className="bg-white py-4 sm:py-2">
       <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-20 mb-12">
        <div className="flex flex-wrap justify-around items-center p-5  rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0">
          {datas.map(( data) => (
            <DashBoardCard header={data.header} button={data.button} img={data.img} description={data.description} key={data.header} />
          ))}
          
          
         


        </div>
      </div>
    </div>

  </div>
  )
}

export default dashboard