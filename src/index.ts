import { ensureElement } from './utils/utils';
import './scss/styles.scss';
import { EventEmitter } from './components/base/Events';
import { CatalogApi } from './components/modelApi/CatalogApi';
import { AppState } from './components/AppState';
import { CatalogItemView } from './components/view/CatalogItemView';
import { ModalView } from './components/view/ModalView';
import { CatalogItemPreviewView } from './components/view/CatalogItemPreviewView';
import { BasketView } from './components/view/BasketView';
import { BasketItemView } from './components/view/BasketItemView';
import { OrderView } from './components/view/OrderView';
import { ContactsForm, OrderForm } from './types';
import { ContactsView } from './components/view/ContactsView';
import { SuccessView } from './components/view/SuccessView';

import {Page} from "./components/Page";

const itemsCatalog = ensureElement<HTMLElement>('.gallery');
const basketButton = ensureElement<HTMLButtonElement>('.header__basket');
const basketCounter = ensureElement<HTMLSpanElement>(
	'.header__basket-counter',
	basketButton
);

const events = new EventEmitter();
const appState = new AppState(events);

const catalogApi = new CatalogApi();

const modal = new ModalView(events);
const basket = new BasketView(events);
const order = new OrderView(events);
const contacts = new ContactsView(events);

const page = new Page(document.body, events);

events.on('modal:open', () => {
	page.locked(true);
});

events.on('modal:close', () => {
	page.locked(false);
});

events.on('catalogItems:set', () => {
	appState.catalogItems.forEach((item) =>
		itemsCatalog.appendChild(new CatalogItemView(events).render(item))
	);
});

events.on('basketItems:change', () => {
	basketCounter.textContent = `${appState.basketItems.length}`;

	basket.render({
		disableBuyButton: !appState.basketTotal,
		totalPrice: appState.basketTotal,
		items: appState.basketItems.map((item, index) =>
			new BasketItemView(events).render({
				...item,
				index: index + 1,
			})
		),
	});
});

events.on<{ id: string }>('catalogItem:click', ({ id }) => {
	const item = appState.getCatalogItemById(id);

	modal.render({
		content: new CatalogItemPreviewView(events).render({
			...item,
			disableBuyButton:
				item.price === null || appState.basketItems.includes(item),
		}),
	});
});

events.on<{ id: string }>('catalogItem:addToCartClick', ({ id }) => {
	appState.addBasketItem(appState.getCatalogItemById(id));
	modal.close();
});

events.on<{ id: string }>('basketItem:delete', ({ id }) =>
	appState.removeBasketItem(id)
);

events.on('basket:buy', () =>
	modal.render({
		content: order.render(appState.validateOrderForm()),
	})
);

events.on<Partial<OrderForm>>('order:change', (data) => {
	appState.orderForm = { ...appState.orderForm, ...data };
	order.render(appState.validateOrderForm());
});

events.on<Partial<ContactsForm>>('contacts:change', (data) => {
	appState.contactsForm = { ...appState.contactsForm, ...data };
	contacts.render(appState.validateContactsForm());
});

events.on('order:submit', () =>
	modal.render({ content: contacts.render(appState.validateContactsForm()) })
);

events.on('contacts:submit', () => {
	catalogApi
		.postOrder({
			payment: appState.orderForm.paymentType,
			email: appState.contactsForm.email,
			phone: appState.contactsForm.phone,
			address: appState.orderForm.address,
			total: appState.basketTotal,
			items: appState.basketItems.map((item) => item.id),
		})
		.then(() => {
			modal.render({
				content: new SuccessView(events).render({
					total: appState.basketTotal,
				}),
			});
			appState.clearBasket();
			appState.resetForms();
			order.reset();
			contacts.reset();
		})
		.catch(console.error);
});

events.on('success:click', () => {
	modal.close();
});

basketButton.addEventListener('click', () => {
	modal.render({
		content: basket.render(),
	});
});

catalogApi
	.getCatalogItems()
	.then((data) => (appState.catalogItems = data.items))
	.catch(console.error);
