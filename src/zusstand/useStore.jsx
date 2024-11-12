import {create} from 'zustand'

const API = "https://67237c71493fac3cf24b0d97.mockapi.io/"

const useStore = create((set)=>({
    store:[],
    isLoading: false,
    isError:null,

    // get all user
    FetchGetAll: async (path)=>{
        set({isLoading:true,isError:null});
        try {
            const repose = await fetch(`${API}/${path}`);
            const data = repose.json();
            set({store:data, isLoading:false})
        } catch (error) {
            set({isError:error.message,isLoading: false})
        }
    },
    // get user theo id
    FetchGetId: async(path, id)=>{
        set({isLoading:true, isError:null});
        try {
            const repose = await fetch(`${API}/${path}:${id}`)
            const data = repose.json();
            set({store:data, isLoading:false});
        } catch (error) {
            set({isError:error.message,isLoading: false})
        }
    },
    //create user
    FetchCreate: async (path,userData)=>{
        set({isLoading:true, isError:null});
        try {
            const repose = await fetch(`${API}${path}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
            const newUser = await repose.json();
            set((state)=>({store:[...state.store, newUser],isLoading:false}));
            return newUser
        } catch (error) {
            set({isError:error.message,isLoading: false})
        }
    },
    //update user
    FetchUpdate: async(path ,userData, id) =>{
        set({isLoading:true, isError:null});
        try {
            const repose = await fetch(`${API}/${path}:${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
            const updateStore = await repose.json();
            set((state)=>({
                store:state.store.map((store)=>(store.id === id ? updateStore:store)),
                isLoading:false
            }))
        } catch (error) {
            set({isError:error.message,isLoading: false})
        }
    },
    FetchDelete: async(path, id) =>{
        set({isLoading:true, isError:null});
        try {
            await fetch(`${API}/${path}:${id}`,{
                method:'DELETE'
            });
            set((state)=>({
                store:state.store.filter((store)=>(store.id !== id))
            }))
        } catch (error) {
            set({isError:error.message,isLoading: false})
        }
    }
}))

export default useStore;