


const UserCard = ({name, username, email, image, type, action}) => {
  return (
    
<div class="w-full max-w-xs bg-white border border-gray-200 rounded-lg shadow mb-4">
    
    <div class="flex flex-col items-center py-10">
        <img class="w-24 h-24 mb-3 rounded-full shadow-lg" src={image} alt="Bonnie image"/>
        <h5 class="mb-1 text-xl font-medium text-gray-900">{type?`${type}. `:""} {name}</h5>
        <span class="text-sm text-gray-500">@{username}</span>
        <span class="text-sm text-gray-900">{email}</span>
        <div class="flex mt-4 space-x-3 md:mt-6">
            <a href="#" class="black_btn">{action}</a>
        </div>
    </div>
</div>

  )
}

export default UserCard