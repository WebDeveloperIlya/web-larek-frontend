import {
	CatalogItemDto,
	ContactsForm,
	FormProps,
	IEvents,
	OrderForm,
} from '../types';

export class AppState {
	private __basketItems: CatalogItemDto[] = [];
	private __catalogItems: CatalogItemDto[] = [];
	private __orderForm: OrderForm = { address: '', paymentType: 'online' };
	private __contactsForm: ContactsForm = { email: '', phone: '' };

	constructor(private events: IEvents) {}

	set catalogItems(items: CatalogItemDto[]) {
		this.__catalogItems = items;
		this.events.emit('catalogItems:set');
	}

	get catalogItems(): CatalogItemDto[] {
		return this.__catalogItems;
	}

	set orderForm(form: OrderForm) {
		this.__orderForm = form;
	}

	get orderForm(): OrderForm {
		return this.__orderForm;
	}

	set contactsForm(form: ContactsForm) {
		this.__contactsForm = form;
	}

	get contactsForm(): ContactsForm {
		return this.__contactsForm;
	}

	get basketItems(): CatalogItemDto[] {
		return this.__basketItems;
	}

	get basketTotal(): number {
		return this.__basketItems.reduce((acc, item) => acc + item.price, 0);
	}

	getCatalogItemById(id: number | string): CatalogItemDto | undefined {
		return this.__catalogItems.find((item) => item.id === String(id));
	}

	addBasketItem(catalogItem: CatalogItemDto): void {
		if (this.basketItems.some((item) => item.id === catalogItem.id)) return;
		this.__basketItems.push(catalogItem);
		this.events.emit('basketItems:change');
	}

	removeBasketItem(id: string): void {
		const itemIndex = this.__basketItems.findIndex((item) => item.id === id);
		if (itemIndex !== -1) {
			this.__basketItems.splice(itemIndex, 1);
		}
		this.events.emit('basketItems:change');
	}

	clearBasket(): void {
		this.__basketItems = [];
		this.events.emit('basketItems:change');
	}

	resetForms(): void {
		this.__orderForm = { address: '', paymentType: 'online' };
		this.__contactsForm = { email: '', phone: '' };
	}

	validateOrderForm(): FormProps {
		const errors = [];
		let valid = true;
		if (!this.orderForm.address.length) {
			errors.push('Заполните адрес доставки');
			valid = false;
		}
		if (!this.orderForm.paymentType.length) {
			errors.push('Выберите тип оплаты');
			valid = false;
		}

		return { errors, valid };
	}

	validateContactsForm(): FormProps {
		const errors = [];
		let valid = true;
		if (!this.contactsForm.email.length) {
			errors.push('Введите email');
			valid = false;
		}
		if (!this.contactsForm.phone.length) {
			errors.push('Введите телефон');
			valid = false;
		}

		return { errors, valid };
	}
}
