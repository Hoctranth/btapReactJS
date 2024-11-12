import {create} from 'zustand'

const APIuser = "https://67237c71493fac3cf24b0d97.mockapi.io/user"

const useUserStore = create((set)=>({
    users:[],
    isLoading: false,
    isError:null,

    // get all user
    FetchGetAllUser: async ()=>{
        set({isLoading:true,isError:null});
        try {
            const repose = await fetch(APIuser);
            const data = repose.json();
            set({users:data, isLoading:false})
        } catch (error) {
            set({isError:error.message,isLoading: false})
        }
    },
    // get user theo id
    FetchGetUserId: async(id)=>{
        set({isLoading:true, isError:null});
        try {
            const repose = await fetch(`${APIuser}/${id}`)
            const data = repose.json();
            set({users:data, isLoading:false});
        } catch (error) {
            set({isError:error.message,isLoading: false})
        }
    },
    //create user
    FetchCreateUser: async (userData)=>{
        set({isLoading:true, isError:null});
        try {
            const repose = await fetch(APIuser, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
            const newUser = await repose.json();
            set((state)=>({users:[...state.users, newUser],isLoading:false}));
            return newUser
        } catch (error) {
            set({isError:error.message,isLoading: false})
        }
    },
    //update user
    FetchUpdateUser: async(id ,userData) =>{
        set({isLoading:true, isError:null});
        try {
            const repose = await fetch(`${APIuser}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
            const updateUser = await repose.json();
            set((state)=>({
                users:state.users.map((user)=>(user.id === id ? updateUser:user)),
                isLoading:false
            }))
        } catch (error) {
            set({isError:error.message,isLoading: false})
        }
    },
    FetchDeleteUser: async(id) =>{
        set({isLoading:true, isError:null});
        try {
            await fetch(`${APIuser}/${id}`,{
                method:'DELETE'
            });
            set((state)=>({
                user:state.users.filter((user)=>(user.id !== id))
            }))
        } catch (error) {
            set({isError:error.message,isLoading: false})
        }
    }
}))

export default useUserStore;