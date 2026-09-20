export default function Hero() {
  return (
    <div className="wrap hero">
      <div className="hero-copy">
        <h1>Classic meets modern, made for people who dress with intent.</h1>
        <p>Clothing, shoes, bags and jewellery, picked and styled in Abuja. Choose a piece, send it to us on WhatsApp, and we deliver anywhere in Nigeria.</p>
        <div className="cta-row">
          <a className="btn solid" href="/shop">Browse the shop</a>
          <a className="btn" href="/designs">See our new line</a>
        </div>
      </div>

      <figure className="hero-img">
        <img src="/images/hero.jpg" alt="A tan leather top-handle bag styled with a cream blazer" width="640" height="900" fetchPriority="high" />
        <figcaption>
          <span>Bags</span>
          <a href="/shop/bags">Shop the collection</a>
        </figcaption>
      </figure>
    </div>
  );
}