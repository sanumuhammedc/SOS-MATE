import { useSession } from "next-auth/react";

const Profile = ({ name, desc }) => {

  const { data: session } = useSession()

  return (
    <section className="w-full" >
      <h1 className="head_text text-left" >
        <span className="blue_gradient" >{session?.user.name}'s Profile</span>
      </h1>
      <p className="desc text-left" >{desc}</p>

      <div class="bg-white md:mx-auto rounded shadow-xl w-full overflow-hidden my-4">
        <div class="h-[140px] bg-gradient-to-r from-cyan-500 to-blue-500"></div>
        <div class="px-5 py-2 flex flex-col gap-3 pb-6">
          <div class="h-[90px] shadow-md w-[90px] rounded-full border-4 overflow-hidden -mt-14 border-white">
            <img src={session?.user.image} class="w-full h-full rounded-full object-center object-cover" />
          </div>
          <div class="">
            <h3 class="text-xl text-slate-900 relative font-bold leading-6">{session?.user.name}</h3>
            <p class="text-sm text-gray-600">{session?.user.email}</p>
          </div>
        </div>
      </div>
      
    </section>
  )
}

export default Profile