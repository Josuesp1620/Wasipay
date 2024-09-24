import RouteIndex from "./routes";
import { Toaster } from 'sonner'
import { useOrder } from "@/features/order/infrastructure/driving-adapter/hooks/useOrder";
import { useShop } from "@/features/shop/infrastructure/driving-adapter/hooks/useShop";
import { useUser } from "@/features/user/infrastructure/driving-adapter/hooks/useUser";
import React from "react";

function App() {

  const [userLoaded, setUserLoaded] = React.useState<boolean>(true);


  const { init: initUser } = useUser()
  const { init : initOrders } = useOrder();
  const { init: initShop } = useShop();
  
  initOrders()  
  initShop()

  React.useEffect(() => {            
    initUser()
    .then(() => {
      setUserLoaded(false);
    }).catch(() => {
      setUserLoaded(false);
    })
  }, [])

  if (userLoaded) {
    return <div></div>;
  }

  
  return (
    <>
      <Toaster position="top-right"/>
      <RouteIndex />
    </>
  );  
}

export default App;
