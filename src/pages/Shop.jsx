import { useMemo } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { CATEGORIES, PRODUCTS, inCategory } from "../data/products";
import ProductCard from "../components/ProductCard";

const SORTS = [
  { key: "new", label: "Newest" },
  { key: "price-low", label: "Price: low to high" },
  { key: "price-high", label: "Price: high to low" },
  { key: "name", label: "Name A–Z" },
];

const totalStock = (p) =>
  p.sizes?.length ? p.sizes.reduce((n, s) => n + s.stock, 0) : 1;

export default function Shop() {
  const { category } = useParams();
  const [params, setParams] = useSearchParams();

  const sort = params.get("sort") || "new";
  const q = params.get("q") || "";
  const inStockOnly = params.get("stock") === "1";

  const current = CATEGORIES.find((c) => c.key === category);
  const title = current ? current.label : "All products";

  const items = useMemo(() => {
    let list = inCategory(category);

    if (q.trim()) {
      const needle = q.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(needle) ||
          p.desc?.toLowerCase().includes(needle) ||
          p.colors?.some((c) => c.toLowerCase().includes(needle))
      );
    }

    if (inStockOnly) list = list.filter((p) => totalStock(p) > 0);

    const sorted = [...list];
    if (sort === "price-low") sorted.sort((a, b) => a.price - b.price);
    else if (sort === "price-high") sorted.sort((a, b) => b.price - a.price);
    else if (sort === "name") sorted.sort((a, b) => a.name.localeCompare(b.name));

    return sorted;
  }, [category, q, sort, inStockOnly]);

  // keep the other params when one changes
  const setParam = (key, value) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true });
  };

  return (
    <>
      <div className="wrap crumbs">
        <Link to="/">Home</Link> / <Link to="/shop">Shop</Link>
        {current && <> / {current.label}</>}
      </div>

      <div className="wrap">
        <div className="head left">
          <div>
            <h2>{title}</h2>
            <p className="muted" style={{ fontSize: ".9rem", marginTop: ".3rem" }}>
              {items.length} {items.length === 1 ? "piece" : "pieces"}
              {q && <> matching “{q}”</>}
            </p>
          </div>
        </div>

        <div className="shopbar">
          <nav className="filters">
            <Link className={!category ? "active" : ""} to={{ pathname: "/shop", search: params.toString() }}>
              All
            </Link>
            {CATEGORIES.map((c) => (
              <Link
                key={c.key}
                className={category === c.key ? "active" : ""}
                to={{ pathname: `/shop/${c.key}`, search: params.toString() }}
              >
                {c.label}
              </Link>
            ))}
          </nav>

          <div style={{ display: "flex", gap: ".6rem", alignItems: "center", flexWrap: "wrap" }}>
            <input
              className="sort"
              type="search"
              placeholder="Search pieces"
              aria-label="Search pieces"
              value={q}
              onChange={(e) => setParam("q", e.target.value)}
            />

            <label style={{ display: "flex", gap: ".4rem", alignItems: "center", fontSize: ".85rem" }}>
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setParam("stock", e.target.checked ? "1" : "")}
              />
              In stock
            </label>

            <select
              className="sort"
              aria-label="Sort by"
              value={sort}
              onChange={(e) => setParam("sort", e.target.value === "new" ? "" : e.target.value)}
            >
              {SORTS.map((s) => (
                <option key={s.key} value={s.key}>{s.label}</option>
              ))}
            </select>
          </div>
        </div>

        {items.length > 0 ? (
          <div className="grid">
            {items.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        ) : (
          <div className="empty">
            <p>Nothing here yet{q && " for that search"}.</p>
            <Link className="btn outline" to="/shop" style={{ marginTop: "1rem" }}>
              See everything
            </Link>
          </div>
        )}
      </div>

      <div style={{ height: "clamp(2.5rem,6vw,4rem)" }} />
    </>
  );
}