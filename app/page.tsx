/*Auth*/
import LoginComponent from "./auth/login/page";
import RegisterComponent from "./auth/register/page";

export default function Global() {
  return (
    <div>
      <LoginComponent/>
      <RegisterComponent/>
    </div>
  );
}
