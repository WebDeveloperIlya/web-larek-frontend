import { IEvents } from '../../types';
import { ensureElement } from '../../utils/utils';
import { Modal } from '../common/Modal';

const page = ensureElement<HTMLBodyElement>('.page__wrapper');

export class ModalView extends Modal {
	constructor(events: IEvents) {
		super(ensureElement<HTMLDivElement>('#modal-container'), {
			onClose: () => {
				events.emit('modal:close'); 
				page.classList.add('page__wrapper_locked');}, 
			onOpen: () => {
				events.emit('modal:open');
				page.classList.remove('page__wrapper_locked');
			},
		});
	}
}
