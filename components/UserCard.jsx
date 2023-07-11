import Link from "next/link";

const UserCard = ({name, username, phone, email, image, type, action, link, target }) => {
  return (

    <div className="w-full max-w-xs bg-white border border-gray-200 rounded-lg shadow mb-4">

      <div className="flex flex-col items-center py-10">
        <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={image} alt="User image" />
        <h5 className="mb-1 text-xl font-medium text-gray-900">{type ? `${type}. ` : ""} {name}</h5>
        <span className="mb-2 text-sm text-gray-500">@{username}</span>
        <div>
        <hr className="border border-gray-300 my-4" />
          <h3 className="text-gray-900"><span className="font-bold">Email:</span> {email}</h3>
          {phone && <h3 className="text-gray-900"><span className="font-bold">Phone:</span> {phone}</h3>}
        </div>
        <div className="flex mt-4 space-x-3 md:mt-6">
          {target?<Link href={link} target={target} className="black_btn">{action}</Link>:<Link href={link} className="black_btn">{action}</Link>}
        </div>
      </div>
    </div>

  )
}

export default UserCard