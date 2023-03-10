import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [checkoutList, setCheckoutList] = useState(
    JSON.parse(localStorage.getItem("checkoutList")) || []
  );

  useEffect(() => {
    localStorage.setItem("checkoutList", JSON.stringify(checkoutList));
  }, [checkoutList]);

  const addToCheckoutList = (item) => {
    const itemIndex = checkoutList.findIndex((i) => i.id === item.id);
    if (itemIndex !== -1) {
      const updatedCheckoutList = [...checkoutList];
      updatedCheckoutList[itemIndex].quantity =
        (updatedCheckoutList[itemIndex].quantity || 0) + 1;
      setCheckoutList(updatedCheckoutList);
      localStorage.setItem("checkoutList", JSON.stringify(updatedCheckoutList));
    } else {
      setCheckoutList([...checkoutList, { ...item, quantity: 1 }]);
      localStorage.setItem(
        "checkoutList",
        JSON.stringify([...checkoutList, { ...item, quantity: 1 }])
      );
    }
  };

  const increaseQuantity = (item) => {
    const updatedCheckoutList = [...checkoutList];
    const itemIndex = updatedCheckoutList.findIndex((i) => i.id === item.id);
    updatedCheckoutList[itemIndex].quantity += 1;
    setCheckoutList(updatedCheckoutList);
    localStorage.setItem("checkoutList", JSON.stringify(updatedCheckoutList));
  };

  const decreaseQuantity = (item) => {
    const updatedCheckoutList = [...checkoutList];
    const itemIndex = updatedCheckoutList.findIndex((i) => i.id === item.id);
    if (updatedCheckoutList[itemIndex].quantity > 1) {
      updatedCheckoutList[itemIndex].quantity -= 1;
    } else {
      updatedCheckoutList.splice(itemIndex, 1);
    }
    setCheckoutList(updatedCheckoutList);
    localStorage.setItem("checkoutList", JSON.stringify(updatedCheckoutList));
  };

  const giveOrder = () => {
    if (checkoutList.length === 0) return alert("There is no item!");
    localStorage.setItem("checkoutList", JSON.stringify([]));
    setCheckoutList([]);
    alert("Your order has been received!");
  };

  const values = {
    checkoutList,
    setCheckoutList,
    addToCheckoutList,
    increaseQuantity,
    decreaseQuantity,
    giveOrder,
  };

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};
