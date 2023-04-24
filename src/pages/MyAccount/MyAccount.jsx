import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import MyAccountMenu from "./MyAccountMenu.jsx";
import Offers from "./Offer.jsx";
import Orders from "./Order.jsx";
import Settings from "./Settings.jsx";
import Points from "./Points.jsx"
import "./MyAccount.scss";
import { useContext, useEffect, useState } from "react";
import { Usercontext, SettingsContext } from "../../context/authlogin";
import { useNavigate, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function MyAccount() {
  const navigate = useNavigate();
  const [MyAccountComp, setMyAccountComp] = useState("myoffers");
  const { menu } = useParams();
  const { navHeight, setloggedIn } = useContext(Usercontext);
  const [cookies, ,removeCookie] = useCookies(["Wedesgin_loggedIn_permanent"]);

  const [settingMenu, setsettingMenu] = useState();

  function logoutUser() {
    if (cookies) {
      removeCookie("Wedesgin_loggedIn_permanent");
    }
    setloggedIn(false);
    navigate("/");
    window.location.reload(false);
  }

  useEffect(() => {
    setsettingMenu(undefined);
  }, [menu]);

  return (
    <>
      <Navbar />
      <SettingsContext.Provider value={{ settingMenu, setsettingMenu }}>
        <div
          className="maiin_myacc_con"
          style={{ paddingTop: `${navHeight + 50}px` }}
        >
          <MyAccountMenu value={setMyAccountComp} getvalue={MyAccountComp} />
          <div className="my_acc_changeable_con">
            {menu === undefined ? (
              <Offers />
            ) : menu === "orders" ? (
              <Orders />
            ) : menu === "signout" ? (
              logoutUser()
            ) : menu === "settings" ? (
              <Settings />
            ) : menu === "points" ? (
              <Points />
            ) : (
              <></>
            )}
          </div>
        </div>
      </SettingsContext.Provider>
      <Footer />
    </>
  );
}
