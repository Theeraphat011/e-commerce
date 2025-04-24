import { useEffect, useState } from "react";
import useEcomstore from "../Store/Store";
import { currentAdmin } from "../api/auth";
import Loading from "./Loading";

const ProtectAdmin = ({ element }) => {
    const [isAuth, setAuth] = useState(false);
    const user = useEcomstore((state) => state.user);
    const token = useEcomstore((state) => state.token);

    useEffect(() => {
        if (user && token) {
            currentAdmin(token)
            .then((res) => setAuth(true))
            .catch((err) => setAuth(false))
        }
    }, [])


    return isAuth? element : <Loading />
}
export default ProtectAdmin