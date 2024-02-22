import User from "../models/user.model.js"

export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id
        // this is the current user viewing the sidebar
        // now get all the users except the current viewing user
        const filteredUsers = await User.find({_id: {$ne: loggedInUserId}}).select ("-password")

        return res.status(200).json(filteredUsers);
        
        
    } catch (error) {
        console.error("Error in getUsersForSidebar: ", error.message)
        res.status(500).json({error: "Internal server error"})
    }
}