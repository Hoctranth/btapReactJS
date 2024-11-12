import useStore from "../zusstand/useStore";
const userAPI = {
    getAll: async (search = "")=>{
        const { FetchGetAll } = useStore.getState()
        await (FetchGetAll('/user'))
        const users = useStore.getState().store;
        if(search===""){
            return users
        }
        return users.filter(user => user.username.includes(search) || user.name.includes(search));
    },
    login: async (body) => {
        const users = await userAPI.getAll();
        console.log(body.username)
        return users.find(user => user.username === body.username && user.password === body.password);
    },
    create: async(body)=>{
        const { FetchCreate } = useStore.getState()
        const repose = await FetchCreate('/user', body)
        return repose;
    },
    update: async(body, id)=>{
        const { FetchUpdate } = useStore.getState()
        const updatee = await FetchUpdate('/user', body, id)
        return updatee;
    },
    delete: async(id)=>{
        const deletee = await useStore.FetchDelete('/user', id)
        return deletee;
    }
}

export default userAPI