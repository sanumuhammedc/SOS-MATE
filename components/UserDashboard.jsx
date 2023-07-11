import DashBoardCard from './DashBoardCard'


const datas = [
    {
        header: "Call Doctor",
        img: "./assets/images/doctor.svg",
        button: "Call Now",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, reprehenderit.",
        link: "/videoChat"
    },
    {
        header: "Book Ambulance",
        img: "./assets/images/ambulance.svg",
        button: "Book Now",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, reprehenderit.",
        link: "/book-ambulance"
    },
    {
        header: "Call Fire Force",
        img: "./assets/images/fire.svg",
        button: "Call Now",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, reprehenderit.",
        link: "/call-fire-force"
    },
    {
        header: "Medical Records",
        img: "./assets/images/upload.svg",
        button: "View Now",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, reprehenderit.",
        link: "/medical-records"
    }

]


const UserDashboard = () => {
  return (
    <div>
            <div className="bg-white py-4 sm:py-2">
                <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-20 mb-12">
                    <div className="flex flex-wrap justify-around items-center p-5  rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0">
                        {datas.map((data) => (
                            <DashBoardCard header={data.header} button={data.button} img={data.img} description={data.description} key={data.header} link={data.link} />
                        ))}
                    </div>
                </div>
            </div>

        </div >
  )
}

export default UserDashboard