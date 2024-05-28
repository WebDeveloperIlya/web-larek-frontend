import { Order, OrderDto } from '../../types';
import { API_URL } from '../../utils/constants';
import { Api } from '../base/Api';

export class OrderApi extends Api {
	constructor() {
		super(API_URL);
	}

	postOrder(order: Order) {
		return this.post('/order', order) as Promise<OrderDto>;
	}
}
