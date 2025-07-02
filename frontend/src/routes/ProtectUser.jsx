import { useEffect, useState } from "react";
import useEcomstore from "../Store/Store";
import { currentUser } from "../api/auth";
import Loading from "./Loading";

const ProtectUser = ({ element }) => {
    const [isAuth, setAuth] = useState(false);
    const user = useEcomstore((state) => state.user);
    const token = useEcomstore((state) => state.token);

    useEffect(() => {
        if (user && token) {
            // console.log
            currentUser(token)
            .then((res) => setAuth(true))
            .catch((err) => setAuth(false))
        }
    }, [])


    return isAuth? element : <Loading />
}
export default ProtectUser