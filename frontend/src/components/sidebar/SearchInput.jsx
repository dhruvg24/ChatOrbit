import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useGetConversations from "../../hooks/useGetConversations.js";
import useConversation from "../../zustand/useConversation.js"
import toast from "react-hot-toast"


const SearchInput = () => {
  const [search, setSearch] = useState("");

  const {setSelectedConversation } = useConversation()
  // from zustand global state mgmt

  const {conversations} = useGetConversations()


  const handleSubmit = (e) => {
    e.preventDefault(); 
    if(!search){
      return;
    }
    if(search.length<3){
      return toast.error("Search term must be of atleast 3 characters")
    }
    // search 
    const conversation = conversations.find((c)=>c.fullName.toLowerCase().includes(search.toLowerCase()));

    if(conversation){
      setSelectedConversation(conversation)
      setSearch("");
    }else{
      toast.error("No such user found!")
    }

  }
  return (
    <form className="flex items-center gap-2" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search..."
        className="input input-bordered rounded-full"
        value= {search}
        onChange={(e)=>setSearch(e.target.value)}
      />
      <button type="submit" className="btn btn-circle bg-sky-500 text-white">
      <IoSearchSharp className="w-6 h-6 outline-none" />
      </button>
    </form>
  );
};

export default SearchInput;
