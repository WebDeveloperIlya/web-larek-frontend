import { CatalogItemDto, CatalogItemsDto, Order, OrderDto } from '../../types';
import { API_URL, CDN_URL } from '../../utils/constants';
import { Api } from '../base/Api';

export class CatalogApi extends Api {
	constructor() {
		super(API_URL);
	}

	postOrder(order: Order) {
		return this.post('/order', order) as Promise<OrderDto>;
	}

	async getCatalogItems() {
		const res = (await this.get('/product')) as CatalogItemsDto;

		const modifiedItems = res.items.map((item) => ({
			...item,
			image: `${CDN_URL}/${item.image}`,
		}));
		return {
			...res,
			items: modifiedItems,
		};
	}

	async getCatalogItem(id: string) {
		const res = (await this.get(`/product/${id}`)) as CatalogItemDto;

		return {
			...res,
			image: `${CDN_URL}/${res.image}`,
		};
	}
}
