import { createContext, useContext, useEffect, useMemo, useReducer } from "react";

const CartContext = createContext(null);
const KEY = "ca_cart_v1";

function load() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch {
    return [];
  }
}

function reducer(state, action) {
  switch (action.type) {
    case "add": {
      const { item } = action;
      const key = (i) => [i.id, i.size || "", i.color || "", i.measurements ? JSON.stringify(i.measurements) : ""].join("|");
      const found = state.find((i) => key(i) === key(item));
      return found
        ? state.map((i) => (key(i) === key(item) ? { ...i, qty: i.qty + item.qty } : i))
        : [...state, item];
    }
    case "qty":
      return state
        .map((i, n) => (n === action.index ? { ...i, qty: Math.max(0, action.qty) } : i))
        .filter((i) => i.qty > 0);
    case "remove":
      return state.filter((_, n) => n !== action.index);
    case "clear":
      return [];
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, null, load);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(items));
    } catch {
      /* storage unavailable — cart stays in memory only */
    }
  }, [items]);

  const value = useMemo(() => {
    const count = items.reduce((n, i) => n + i.qty, 0);
    const subtotal = items.reduce((n, i) => n + i.price * i.qty, 0);
    return {
      items,
      count,
      subtotal,
      add: (item) => dispatch({ type: "add", item: { qty: 1, ...item } }),
      setQty: (index, qty) => dispatch({ type: "qty", index, qty }),
      remove: (index) => dispatch({ type: "remove", index }),
      clear: () => dispatch({ type: "clear" }),
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);