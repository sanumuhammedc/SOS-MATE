import Link from "next/link";

const UserCard = ({name, username, email, image, type, action}) => {
  return (
    
<div className="w-full max-w-xs bg-white border border-gray-200 rounded-lg shadow mb-4">
    
    <div className="flex flex-col items-center py-10">
        <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={image} alt="Bonnie image"/>
        <h5 className="mb-1 text-xl font-medium text-gray-900">{type?`${type}. `:""} {name}</h5>
        <span className="text-sm text-gray-500">@{username}</span>
        <span className="text-sm text-gray-900">{email}</span>
        <div className="flex mt-4 space-x-3 md:mt-6">
            <Link href="#" className="black_btn">{action}</Link>
        </div>
    </div>
</div>

  )
}

export default UserCard