'use strict';

/** 価格は税込。数字を書き換えると、表示と合計がそのまま変わります。 */
const PRODUCTS = [
  {
    id: 'mask',
    name: 'メルティングマスク',
    cat: 'ホームケア',
    concern: 'マスク',
    volume: '220g',
    price: 10780,
    ship: true,
    tone: 'cream',
    image: 'assets/mask.png',
    payUrl: 'https://web.online.airpayment.jp/payment?planId=PLOVbtZHrSQP6W0AOv',
    payNote: '1個・税込10,780円',
    blurb: '220g。税込10,780円。',
    detail: '内容量は220gです。店頭受け取りと配送が選べます。表示価格は税込10,780円です。',
  },
  {
    id: 'serum',
    name: '幹細胞セラム',
    cat: 'ホームケア',
    concern: 'セラム',
    volume: '15g',
    price: 10780,
    ship: true,
    tone: 'mist',
    image: 'assets/serum.png',
    payUrl: 'https://web.online.airpayment.jp/payment?planId=PLdCZgUapV82KlgCRE',
    blurb: '15g。税込10,780円。',
    detail: '内容量は15gです。店頭受け取りと配送が選べます。表示価格は税込10,780円です。',
  },
  {
    id: 'lotion',
    name: '高濃度幹細胞化粧水',
    cat: 'ホームケア',
    concern: '化粧水',
    volume: '120ml',
    price: 8250,
    ship: true,
    tone: 'mist',
    image: 'assets/lotion.png',
    payUrl: 'https://web.online.airpayment.jp/payment?planId=PLN70ucwUmkrXw0CNz',
    payNote: '1本・税込8,250円',
    blurb: '120ml。税込8,250円。',
    detail: '内容量は120mlです。店頭受け取りと配送が選べます。表示価格は税込8,250円です。',
  },
  {
    id: 'uv',
    name: 'エクソソーム入り日焼け止めUVクリーム 30g',
    cat: 'ホームケア',
    concern: 'UV',
    volume: '30g',
    price: 3300,
    ship: true,
    tone: 'sun',
    image: 'assets/uv.png',
    payUrl: 'https://web.online.airpayment.jp/payment?planId=PL1BzRnKTj5kAWhTI8',
    payNote: '1本・税込3,300円',
    blurb: '日焼け止めUVクリーム。税込3,300円。',
    detail: 'エクソソーム入りの日焼け止めUVクリームです。内容量は30gです。店頭受け取りと配送が選べます。表示価格は税込3,300円です。',
  },
  {
    id: 'cleanse',
    name: 'プレミアムクレンジング',
    cat: 'ホームケア',
    concern: 'クレンジング',
    volume: '100g',
    price: 3300,
    ship: true,
    tone: 'foam',
    image: 'assets/cleanse.png',
    payUrl: 'https://web.online.airpayment.jp/payment?planId=PLUTwHt4TaWKjc910G',
    payNote: '1本・税込3,300円',
    blurb: '100g。税込3,300円。',
    detail: '内容量は100gです。店頭受け取りと配送が選べます。表示価格は税込3,300円です。',
  },
  {
    id: 'wash',
    name: 'プレミアム洗顔フォーム',
    cat: 'ホームケア',
    concern: '洗顔',
    volume: '100g',
    price: 3300,
    ship: true,
    tone: 'wash',
    image: 'assets/wash.png',
    payUrl: 'https://web.online.airpayment.jp/payment?planId=PLy0aAoGvTQH91EnnJ',
    payNote: '1本・税込3,300円',
    blurb: '100g。税込3,300円。',
    detail: '内容量は100gです。店頭受け取りと配送が選べます。表示価格は税込3,300円です。',
  },
  {
    id: 'milky-lotion',
    name: '高濃度幹細胞乳液 プレミアムミルキーローション',
    cat: 'ホームケア',
    concern: '乳液',
    volume: '80mL',
    price: 8250,
    ship: true,
    tone: 'mist',
    image: 'assets/milky-lotion.jpg',
    payUrl: 'https://web.online.airpayment.jp/payment?planId=PLT7uRBCoQdTtrSnLI',
    payNote: '1本・税込8,250円',
    blurb: '80mL・税込8,250円',
    detail: '内容量 80mL',
  },
  {
    id: 'premium-cream',
    name: '高濃度幹細胞プレミアムクリーム',
    cat: 'ホームケア',
    concern: 'クリーム',
    volume: '30g',
    price: 8250,
    ship: true,
    tone: 'cream',
    image: 'assets/premium-cream.jpg',
    payUrl: 'https://web.online.airpayment.jp/payment?planId=PLvHymqS5KggcRYaN2',
    payNote: '1個・税込8,250円',
    blurb: '30g・税込8,250円',
    detail: '内容量 30g',
  },
];

const FILTERS = ['すべて', 'マスク', 'セラム', '化粧水', '乳液', 'クリーム', 'UV', 'クレンジング', '洗顔'];
const CART_KEY = 'cure-ec-cart';
const ORDER_EMAIL = 'kyon.kira.0725.0305@gmail.com';
const ORDER_KEY = 'cure-ec-orders';

const $ = (id) => document.getElementById(id);
let filter = 'すべて';
let view = 'shop';
let activeId = '';

function yen(n) {
  return '¥' + Number(n || 0).toLocaleString('ja-JP');
}

function esc(s) {
  return String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function readCart() {
  try {
    const raw = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
    if (!Array.isArray(raw)) return [];
    return raw
      .map((row) => ({ id: String(row.id || ''), qty: Math.min(9, Math.max(1, Number(row.qty) || 1)) }))
      .filter((row) => PRODUCTS.some((p) => p.id === row.id));
  } catch {
    return [];
  }
}

function writeCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function readOrders() {
  try {
    const raw = JSON.parse(localStorage.getItem(ORDER_KEY) || '[]');
    return Array.isArray(raw) ? raw : [];
  } catch {
    return [];
  }
}

function product(id) {
  return PRODUCTS.find((item) => item.id === id);
}

function cartLines() {
  return readCart().map((row) => ({ ...product(row.id), qty: row.qty }));
}

function cartCount() {
  return readCart().reduce((sum, row) => sum + row.qty, 0);
}

const FREE_SHIPPING_AT = 20000;
const SHIPPING_FEE = 1000;

function cartTotal(lines = cartLines()) {
  return lines.reduce((sum, line) => sum + line.price * line.qty, 0);
}

function shippingFee(subtotal, receive) {
  if (receive !== 'delivery') return 0;
  return subtotal >= FREE_SHIPPING_AT ? 0 : SHIPPING_FEE;
}

function quote(lines, receive) {
  const subtotal = cartTotal(lines);
  const shipping = shippingFee(subtotal, receive);
  return { subtotal, shipping, total: subtotal + shipping };
}

function needsPickup(lines = cartLines()) {
  return lines.some((line) => !line.ship);
}

function setQty(id, qty) {
  const cart = readCart().filter((row) => row.id !== id);
  if (qty > 0) cart.push({ id, qty: Math.min(9, qty) });
  writeCart(cart);
  paint();
}

function addToCart(id) {
  const cart = readCart();
  const row = cart.find((item) => item.id === id);
  if (row) row.qty = Math.min(9, row.qty + 1);
  else cart.push({ id, qty: 1 });
  writeCart(cart);
  activeId = '';
  openDrawer(true);
  paint();
  announce(`${product(id)?.name || ''}をカートに入れました`);
}

function announce(text) {
  const el = $('live');
  el.textContent = '';
  el.textContent = text;
}

function openDrawer(open) {
  $('drawer').classList.toggle('open', open);
  $('scrim').classList.toggle('open', open);
  document.body.classList.toggle('lock', open);
  if (open) $('drawer').querySelector('button')?.focus();
}

function show(next) {
  view = next;
  if (next !== 'shop') openDrawer(false);
  paint();
  window.scrollTo(0, 0);
}

function paintFilters() {
  $('filters').innerHTML = FILTERS.map((name) => {
    const on = name === filter ? ' on' : '';
    return `<button type="button" class="chip${on}" data-filter="${esc(name)}">${esc(name)}</button>`;
  }).join('');
}

function payBlock(item) {
  if (!item.payUrl) return '';
  const amount = Number(item.price).toLocaleString('ja-JP');
  const note = item.payNote || `1本・税込${amount}円`;
  return `<div class="payment">
    <a class="pay" href="${esc(item.payUrl)}" target="_blank" rel="noopener noreferrer" aria-label="${esc(item.name)}のクレジットカード決済">クレジットカード決済</a>
    <p class="fine">${esc(note)}</p>
  </div>`;
}

const CARD_PAYMENT_GUIDE = 'クレジットカード決済は、商品1点ずつのお支払いです。複数の商品をクレジットカードでまとめてお支払いの場合は、まとめたQRをご用意しますので、お問い合わせください。';

function paintGrid() {
  const list = PRODUCTS.filter((item) => filter === 'すべて' || item.concern === filter);
  $('grid').innerHTML = list.length ? list.map((item) => `
    <article class="card">
      <button type="button" class="swatch ${item.image ? 'has-photo' : esc(item.tone)}" data-open="${esc(item.id)}" aria-label="${esc(item.name)}の詳細">
        ${item.image ? `<img class="product-photo" src="${esc(item.image)}" alt="">` : `<span class="mark">${esc(item.name)}</span>`}
        ${item.volume ? `<span class="vol">${esc(item.volume)}</span>` : ''}
      </button>
      <div class="card-body">
        <p class="eyebrow">${esc(item.cat)} ・ ${esc(item.concern)}</p>
        <h3>${esc(item.name)}</h3>
        <p class="blurb">${esc(item.blurb.replace(/。(?=税込)/, ' ・ ').replace(/(円)。$/, '$1'))}</p>
        <div class="buy">
          <p class="price">${yen(item.price)}<small>税込</small></p>
          <button type="button" data-add="${esc(item.id)}">カートに入れる</button>
        </div>
      </div>
    </article>
  `).join('') : '<p class="empty">この絞り込みに合う商品はありません。</p>';
}

function paintDrawer() {
  const lines = cartLines();
  $('cartCount').textContent = String(cartCount());
  $('bagCount').textContent = String(cartCount());
  if (!lines.length) {
    $('drawerBody').innerHTML = '<p class="empty">カートは空です。気になるホームケアを入れてみてください。</p>';
    $('drawerFoot').classList.add('hidden');
    return;
  }
  $('drawerFoot').classList.remove('hidden');
  const subtotal = cartTotal(lines);
  $('drawerTotal').textContent = yen(subtotal);
  const remain = FREE_SHIPPING_AT - subtotal;
  $('shipNote').textContent = remain <= 0
    ? '配送は送料無料です。店頭受け取りも送料はありません。'
    : `配送は送料${yen(SHIPPING_FEE)}です。あと${yen(remain)}で送料無料。店頭受け取りは送料なし。`;
  $('drawerBody').innerHTML = (lines.some((line) => line.payUrl)
    ? `<p class="fine">${CARD_PAYMENT_GUIDE}</p>`
    : '') + lines.map((line) => `
    <article class="line">
      <div class="mini ${line.image ? 'has-photo' : esc(line.tone)}" aria-hidden="true">${line.image ? `<img src="${esc(line.image)}" alt="">` : ''}</div>
      <div>
        <h3>${esc(line.name)}</h3>
        <p>${yen(line.price)}<span>${line.ship ? '配送可' : '店頭のみ'}</span></p>
        <div class="qty">
          <button type="button" data-dec="${esc(line.id)}" aria-label="${esc(line.name)}を1つ減らす">−</button>
          <span>${line.qty}</span>
          <button type="button" data-inc="${esc(line.id)}" aria-label="${esc(line.name)}を1つ増やす">＋</button>
        </div>
      </div>
      <button type="button" class="text" data-remove="${esc(line.id)}">削除</button>
      ${payBlock(line)}
    </article>
  `).join('');
  $('pickupNote').hidden = !needsPickup(lines);
}

function paintDetail() {
  const box = $('detail');
  const item = product(activeId);
  if (!item || view !== 'shop') {
    box.classList.add('hidden');
    box.innerHTML = '';
    return;
  }
  box.classList.remove('hidden');
  box.innerHTML = `
    <div class="detail-card" role="dialog" aria-modal="true" aria-labelledby="detailTitle">
      <button type="button" class="text close-detail" data-close-detail>閉じる</button>
      <div class="swatch lg ${esc(item.tone)}"><span class="mark">${esc(item.name)}</span>${item.volume ? `<span class="vol">${esc(item.volume)}</span>` : ''}</div>
      <p class="eyebrow">${esc(item.cat)}</p>
      <h2 id="detailTitle">${esc(item.name)}</h2>
      <p class="price">${yen(item.price)}<small>税込</small></p>
      <p>${esc(item.detail)}</p>
      ${item.id === 'serum' || item.id === 'mask' || item.id === 'lotion' ? '<p class="fine">当店は、HITOYURAI製品およびダーマベル メルティングマスクの正規代理店です。代理店規約により、楽天、アマゾン、Yahooなどの外部サイトへの転売は禁止されています。外部サイトでお見かけの際は、粗悪品の恐れがございますので、お気をつけくださいませ。</p>' : ''}
      <p class="fine">${item.ship ? '店頭受け取りと配送が選べます。' : 'この商品は店頭でのご利用です。配送はできません。'}</p>
      <button type="button" data-add="${esc(item.id)}">カートに入れる</button>
    </div>
  `;
}

function paintCheckout() {
  const lines = cartLines();
  const mount = $('checkoutLines');
  if (!lines.length) {
    mount.innerHTML = '<p class="empty">カートが空なので、注文に進めません。</p>';
    $('checkoutForm').classList.add('hidden');
    return;
  }
  $('checkoutForm').classList.remove('hidden');
  const delivery = $('receive').querySelector('option[value="delivery"]');
  const onlyShop = needsPickup(lines);
  delivery.disabled = onlyShop;
  if (onlyShop && $('receive').value === 'delivery') $('receive').value = 'shop';
  const isDelivery = $('receive').value === 'delivery';
  $('deliveryFields').hidden = !isDelivery;
  for (const field of $('deliveryFields').querySelectorAll('input, textarea')) {
    field.disabled = !isDelivery;
    field.required = isDelivery;
  }
  const bill = quote(lines, $('receive').value);
  const shipLabel = isDelivery ? (bill.shipping === 0 ? '無料' : yen(bill.shipping)) : 'なし（店頭受け取り）';
  mount.innerHTML = lines.map((line) => `
    <div class="sum-line"><span>${esc(line.name)} × ${line.qty}</span><strong>${yen(line.price * line.qty)}</strong></div>
  `).join('') + `<div class="sum-line"><span>商品合計</span><strong>${yen(bill.subtotal)}</strong></div><div class="sum-line"><span>送料</span><strong>${shipLabel}</strong></div><div class="sum-line total"><span>合計</span><strong>${yen(bill.total)}</strong></div>`;
  const payable = lines.filter((line) => line.payUrl);
  if (payable.length) {
    mount.innerHTML += `<section aria-labelledby="cardPaymentTitle">
      <h3 id="cardPaymentTitle">クレジットカード決済</h3>
      <p class="fine">${CARD_PAYMENT_GUIDE}</p>
      ${payable.map((line) => `<div><strong>${esc(line.name)}</strong>${payBlock(line)}</div>`).join('')}
    </section>`;
  }
  $('receiveHint').textContent = onlyShop
    ? '施術チケットが入っているので、受け取りは店頭のみです。'
    : bill.shipping === 0 && isDelivery
      ? `商品合計が${yen(FREE_SHIPPING_AT)}以上なので、送料無料です。`
      : isDelivery
        ? `商品合計が${yen(FREE_SHIPPING_AT)}未満なので、送料は${yen(SHIPPING_FEE)}です。`
        : `店頭受け取りは送料なし。配送は商品合計${yen(FREE_SHIPPING_AT)}以上で送料無料、未満は一律${yen(SHIPPING_FEE)}です。`;
}

function paintThanks(order) {
  const items = (order.items || []).map((line) => `<li>${esc(line.name)} × ${line.qty}　${yen(line.price * line.qty)}</li>`).join('');
  $('thanksBody').innerHTML = `
    <p class="order-no">注文番号 <strong>${esc(order.id)}</strong></p>
    <ul>${items}</ul>
    <p>商品合計 ${yen(order.subtotal ?? order.total)} / 送料 ${order.shipping ? yen(order.shipping) : order.address ? '無料' : 'なし（店頭受け取り）'} / 合計 ${yen(order.total)}</p>
    <p>${esc(order.receiveLabel)} / ${esc(order.payLabel)}</p>
    <p>${esc(order.name)} 様${order.phone ? ' ・ ' + esc(order.phone) : ''}</p>
    ${order.address ? `<p>配送先　〒${esc(order.postalCode)} <span style="white-space:pre-line">${esc(order.address)}</span></p>` : ''}
    ${order.note ? `<p>ご要望：${esc(order.note)}</p>` : ''}
    <p class="fine">メールアプリが開いたら、内容をご確認のうえ送信してください。お店からの返信をお待ちください。</p>
  `;
  $('orderMail').href = orderMailUrl(order);
}

function orderMailUrl(order) {
  const body = [
    'Cureオンラインショップへの注文',
    `注文番号　${order.id}`,
    '',
    ...order.items.map((line) => `${line.name} × ${line.qty}　${yen(line.price * line.qty)}`),
    `商品合計　${yen(order.subtotal)}`,
    `送料　${yen(order.shipping)}`,
    `合計　${yen(order.total)}`,
    '',
    `氏名　${order.name}`,
    `電話番号　${order.phone}`,
    ...(order.email ? [`メール　${order.email}`] : []),
    `受け取り　${order.receiveLabel}`,
    ...(order.address ? [`郵便番号　${order.postalCode}`, `配送先住所　${order.address}`] : []),
    `お支払い　${order.payLabel}`,
    ...(order.note ? [`ご要望　${order.note}`] : []),
  ].join('\r\n');
  return `mailto:${ORDER_EMAIL}?subject=${encodeURIComponent(`Cureショップ注文 ${order.id}`)}&body=${encodeURIComponent(body)}`;
}

function paintOrders() {
  const orders = readOrders();
  $('ordersBody').innerHTML = orders.length ? orders.map((order) => `
    <article class="order-card">
      <header><strong>${esc(order.id)}</strong><span>${esc(order.when)}</span></header>
      <p>${esc(order.name)} 様 ・ ${yen(order.total)} ・ ${esc(order.receiveLabel)}</p>
      <p>${(order.items || []).map((line) => `${esc(line.name)}×${line.qty}`).join('、')}</p>
    </article>
  `).join('') : '<p class="empty">このブラウザには、まだ注文がありません。</p>';
}

function paint() {
  $('shopView').classList.toggle('hidden', view !== 'shop');
  $('checkoutView').classList.toggle('hidden', view !== 'checkout');
  $('thanksView').classList.toggle('hidden', view !== 'thanks');
  $('ordersView').classList.toggle('hidden', view !== 'orders');
  paintFilters();
  paintGrid();
  paintDrawer();
  paintDetail();
  if (view === 'checkout') paintCheckout();
  if (view === 'orders') paintOrders();
}

function orderId() {
  const now = new Date();
  const day = now.getFullYear().toString().slice(2) + String(now.getMonth() + 1).padStart(2, '0') + String(now.getDate()).padStart(2, '0');
  const salt = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `C${day}-${salt}`;
}

function placeOrder(form) {
  const lines = cartLines();
  if (!lines.length) {
    announce('カートが空です');
    return;
  }
  const data = new FormData(form);
  const name = String(data.get('name') || '').trim();
  const phone = String(data.get('phone') || '').trim();
  const email = String(data.get('email') || '').trim();
  const receive = String(data.get('receive') || 'shop');
  const pay = String(data.get('pay') || 'shop');
  const note = String(data.get('note') || '').trim().slice(0, 400);
  if (name.length < 1 || name.length > 40) {
    announce('お名前を入力してください');
    form.elements.name.focus();
    return;
  }
  if (!/^0\d{9,10}$/.test(phone.replace(/[-\s]/g, ''))) {
    announce('電話番号は0から始まる10〜11桁で入力してください');
    form.elements.phone.focus();
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    announce('メールアドレスの形を確認してください');
    form.elements.email.focus();
    return;
  }
  if (receive === 'delivery' && needsPickup(lines)) {
    announce('施術チケットは店頭のみです');
    return;
  }
  const postalCode = receive === 'delivery'
    ? String(data.get('postalCode') || '').normalize('NFKC').trim()
    : '';
  const address = receive === 'delivery' ? String(data.get('address') || '').trim() : '';
  if (receive === 'delivery') {
    if (!/^\d{3}-?\d{4}$/.test(postalCode)) {
      announce('郵便番号を7桁で入力してください');
      form.elements.postalCode.focus();
      return;
    }
    if (!address) {
      announce('配送先住所を入力してください');
      form.elements.address.focus();
      return;
    }
  }
  const bill = quote(lines, receive);
  const order = {
    id: orderId(),
    name,
    phone: phone.replace(/[-\s]/g, ''),
    email,
    postalCode,
    address,
    receiveLabel: receive === 'delivery' ? '配送希望' : '店頭受け取り',
    payLabel: pay === 'transfer' ? '振込案内を希望' : '店頭でお支払い',
    note,
    items: lines.map((line) => ({ id: line.id, name: line.name, price: line.price, qty: line.qty })),
    subtotal: bill.subtotal,
    shipping: bill.shipping,
    total: bill.total,
  };
  show('thanks');
  paintThanks(order);
  announce('注文内容を確認し、メールを送信してください');
}

function clickedElement(event) {
  const node = event.target;
  if (node instanceof Element) return node;
  return node && node.parentElement ? node.parentElement : null;
}

document.addEventListener('click', (event) => {
  const el = clickedElement(event);
  if (!el) return;
  if (el.id === 'detail') {
    activeId = '';
    paintDetail();
    return;
  }
  if (el.id === 'scrim') {
    openDrawer(false);
    return;
  }
  const t = el.closest('button, a');
  if (!t) return;
  if (t.dataset.filter) {
    filter = t.dataset.filter;
    paint();
  } else if (t.dataset.add) {
    addToCart(t.dataset.add);
  } else if (t.dataset.open) {
    activeId = t.dataset.open;
    paintDetail();
  } else if (t.dataset.closeDetail !== undefined) {
    activeId = '';
    paintDetail();
  } else if (t.dataset.inc) {
    const row = readCart().find((item) => item.id === t.dataset.inc);
    setQty(t.dataset.inc, (row?.qty || 1) + 1);
  } else if (t.dataset.dec) {
    const row = readCart().find((item) => item.id === t.dataset.dec);
    setQty(t.dataset.dec, (row?.qty || 1) - 1);
  } else if (t.dataset.remove) {
    setQty(t.dataset.remove, 0);
    announce('カートから外しました');
  } else if (t.id === 'openCart') {
    openDrawer(true);
  } else if (t.dataset.closeCart !== undefined) {
    openDrawer(false);
  } else if (t.id === 'toCheckout') {
    if (!cartLines().length) return announce('カートが空です');
    show('checkout');
  } else if (t.dataset.view) {
    show(t.dataset.view);
  }
});

$('checkoutForm').addEventListener('submit', (event) => {
  event.preventDefault();
  placeOrder(event.currentTarget);
});

$('receive').addEventListener('change', paintCheckout);

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;
  if ($('drawer').classList.contains('open')) openDrawer(false);
  if (activeId) {
    activeId = '';
    paintDetail();
  }
});

paint();
