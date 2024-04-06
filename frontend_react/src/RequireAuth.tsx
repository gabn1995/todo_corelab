import { Navigate } from "react-router-dom";
import { isLogged } from './lib/authHandler';

type Props = {
    children: JSX.Element;
};

export const RequireAuth = ({children}: Props) => {
    const isAuth = isLogged();

    if (!isAuth) {
        return <Navigate to="/login" />;
    }

    return children
}