export type ApiListResponse<Type> = {
	total: number;
	items: Type[];
};

export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export type EventName = string | RegExp;
export type Subscriber = (data?: unknown) => void;
export type EmitterEvent = {
	eventName: string;
	data: unknown;
};

export interface IEvents {
	on<T extends object>(event: EventName, callback: (data: T) => void): void;
	emit<T extends object>(event: string, data?: T): void;
	trigger<T extends object>(
		event: string,
		context?: Partial<T>
	): (data: T) => void;
}

export type BasketProps = {
	totalPrice: string | number;
	disableBuyButton: boolean;
	items: HTMLElement[];
};

export type BasketItemProps = {
	title: string;
	price: string | number | null;
	index: number | string;
};

export type BasketItemActions = {
	onDelete: () => void;
};

export type BasketActions = {
	onBuy: () => void;
};

export const CardCategory = {
	'софт-скил': { title: 'софт-скил', modifier: 'soft' },
	'хард-скил': { title: 'хард-скил', modifier: 'hard' },
	другое: { title: 'другое', modifier: 'other' },
	дополнительное: { title: 'дополнительно', modifier: 'additional' },
	кнопка: { title: 'кнопка', modifier: 'button' },
} as const;

export type CardActions = {
	onClick: () => void;
};

export type CardProps = {
	category: keyof typeof CardCategory;
	title: string;
	image: string;
	price: number;
};

export type FormProps = {
	valid: boolean;
	errors: string[];
};

export type FormActions<T> = {
	onSubmit: () => void;
	onInput: (field: keyof T, value: string, validationMessage: string) => void;
};

export type ModalProps = {
	content: HTMLElement;
};

export type ModalActions = {
	onOpen: () => void;
	onClose: () => void;
};

export type SuccessActions = {
	onClick: () => void;
};

export type SuccessProps = {
	total: number;
};

export type CatalogItemDto = {
	id: string;
	description: string;
	image: string;
	title: string;
	category: 'софт-скил' | 'хард-скил' | 'другое' | 'дополнительное' | 'кнопка';
	price: number;
};

export type CatalogItemsDto = {
	total: number;
	items: CatalogItemDto[];
};




export type Order = {
	payment: string;
	email: string;
	phone: string;
	address: string;
	total: number;
	items: string[];
};

export type OrderDto = {
	id: string;
	total: number;
};

export type CatalogItemPreviewViewProps = {
	id: string;
	description: string;
	disableBuyButton: boolean;
} & CardProps;

export type CatalogItemViewProps = {
	id: string;
} & CardProps;

export type ContactsForm = {
	email: string;
	phone: string;
};

export type BasketItemViewProps = {
	id: string;
} & BasketItemProps;


export type OrderForm = {
	paymentType: string;
	address: string;
};