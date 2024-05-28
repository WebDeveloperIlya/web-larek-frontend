import {Component} from "./base/Component";
import {IEvents} from "../types/index";
import {ensureElement} from "../utils/utils";

interface IPage {
    counter: number;
    locked: boolean;
}

export class Page extends Component<IPage> {
    protected _counter: HTMLElement;
    protected _wrapper: HTMLElement;
    protected _basket: HTMLElement;

    


    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);
        this._wrapper = ensureElement<HTMLElement>('.page__wrapper');
        this._basket = ensureElement<HTMLElement>('.header__basket');

        this._basket.addEventListener('click', () => {
            this.events.emit('bids:open');
        });
    }

    set counter(value: number) {
        this.setText(this._counter, String(value));
    }

    locked(value: boolean) {
      if (value) {
          this._wrapper.classList.add('page__wrapper_locked');
      } else {
          this._wrapper.classList.remove('page__wrapper_locked');
      }
  }
}