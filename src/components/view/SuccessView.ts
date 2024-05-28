import { IEvents } from '../../types';
import { cloneTemplate } from '../../utils/utils';
import { Success } from '../common/Success';

export class SuccessView extends Success {
	constructor(events: IEvents) {
		super(cloneTemplate<HTMLDivElement>('#success'), {
			onClick: () => events.emit('success:click'),
		});
	}
}
