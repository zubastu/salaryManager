import { FC, ReactElement, ReactNode } from "react";
import { useGetUserDataQuery } from "../../store/auth/auth.api.ts";
import { Navigate } from "react-router";
import { routes } from "../../utils/routes.ts";
import Modal from "../Modal/Modal.tsx";
import Loader from "../Loader/Loader.tsx";

type TProtectedRouteProps = {
  element: ReactNode | ReactElement;
  adminOnly: boolean;
};

const ProtectedRoute: FC<TProtectedRouteProps> = ({ element, adminOnly }) => {
  const { data, isSuccess, isFetching, isError } = useGetUserDataQuery();

  if (isError) {
    return <Navigate to={routes.login} />;
  }

  if (isFetching) {
    return (
      <Modal>
        <Loader />
      </Modal>
    );
  }

  if (isSuccess) {
    if (adminOnly) {
      return data.role_id === 1 ? element : <Navigate to={routes.workShifts} />;
    }
    return element;
  }
};

export default ProtectedRoute;