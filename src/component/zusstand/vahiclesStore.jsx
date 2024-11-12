import { create } from "zustand";

const APIvahicles = "https://67237c71493fac3cf24b0d97.mockapi.io/vehicles";
const useVahiclesStore = create((set) => ({
    vahicles: [],
    isLoading: false,
    isError: null,

    //get All xe
    FetchGetAllVahicless: async () => {
        set({ isLoading: true, isError: null })
        try {
            const repose = await fetch(APIvahicles);
            const data = repose.json();
            set({ vahicles: data, isLoading: false })
        } catch (error) {
            set({ isError: error.message, isLoading: false })
        }
    },
    FetchGetVahiclessId:async(id)=>{
        set({ isLoading: true, isError: null })
        try {
            const repose = await fetch(`${APIvahicles}/${id}`);
            const data = repose.json();
            set({vahicles:data,isLoading:false});
        }
        catch(error){
            set({ isError: error.message, isLoading: false })
        }
    },
    FetchCreateVahicless: async(vahiclesData)=>{
        set({ isLoading: true, isError: null });
        try {
            const repose = await fetch(APIvahicles,{
                method:"POST",
                headers:{'Content-Type': 'application/json'},
                body: JSON.stringify(vahiclesData)
            })
            const newVahicless = await repose.json();
            set((state)=>({
                vahicles:[...state.vahicles, newVahicless],
                isLoading:false
            }))
        } catch (error) {
            set({ isError: error.message, isLoading: false })
        }
    },
    FetchUpdateVahicless: async(id, vahiclesData)=>{
        set({ isLoading: true, isError: null });
        try {
            const repose = await fetch(`${APIvahicles}/${id}`,{
                method: 'PUT',
                headers:{'Content-Type':'application/json'},
                body: JSON.stringify(vahiclesData)
            })
            const updateVahicless = await repose.json()
            set((state)=>({
                vahicles:state.vahicles.map((vahicles)=>(vahicles.id === id ? updateVahicless:vahicles)),
                isLoading:false
            }))
        } catch (error) {
            set({ isError: error.message, isLoading: false })
        }
    },
    FetchDeleteVahicless: async(id)=>{
        set({ isLoading: true, isError: null });
        try {
            await fetch(`${APIvahicles}/${id}`,{
                method: 'DELETE',
            })
            set((state)=>({
                vahicles:state.vahicles.filter((vahicles)=>(vahicles.id !== id)),
                isLoading:false
            }))
        } catch (error) {
            set({ isError: error.message, isLoading: false })
        }
    }
}))

export default useVahiclesStore