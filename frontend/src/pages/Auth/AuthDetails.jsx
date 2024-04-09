import { useAuth } from "./AuthContext";

const AuthDetails = () => {
  const { authUser } = useAuth();

  return (
    <div>
      {authUser ? (
        <>
          <p>{`Signed In as ${authUser.email}`}</p>
        </>
      ) : (
        <p>Signed Out</p>
      )}
    </div>
  );
};

export default AuthDetails;
