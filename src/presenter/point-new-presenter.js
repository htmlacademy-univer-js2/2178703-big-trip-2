import { render, remove, RenderPosition } from '../framework/render.js';
import PointView from '../view/point-view.js';
import {nanoid} from 'nanoid';
import { UserAction, UpdateType } from '../const.js';

export default class PointNewPresenter {
  #pointListContainer = null;
  #creatingPointComponent = null;
  #changeData = null;
  #destroyCallback = null;

  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;

  #destinations = null;
  #offers = null;

  constructor({pointListContainer, changeData, pointsModel, destinationsModel, offersModel}) {
    this.#pointListContainer = pointListContainer;
    this.#changeData = changeData;
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  init = (callback) => {
    this.#destroyCallback = callback;

    if (this.#creatingPointComponent
   !== null) {
      return;
    }
    this.#destinations = [...this.#destinationsModel.destinations];
    this.#offers = [...this.#offersModel.offers];

    this.#creatingPointComponent = new PointView({
      destination: this.#destinations,
      offers: this.#offers,
      isNewPoint: true
    });
    this.#creatingPointComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#creatingPointComponent.setResetClickHandler(this.#handleResetClick);

    render(this.#creatingPointComponent, this.#pointListContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  destroy = () => {
    if (this.#creatingPointComponent
   === null) {
      return;
    }

    this.#destroyCallback?.();

    remove(this.#creatingPointComponent);
    this.#creatingPointComponent
 = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };

  #handleResetClick = () => {
    this.destroy();
  };

  #handleFormSubmit = (point) => {
    this.#changeData(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      {id: nanoid(), ...point},
    );
    this.destroy();
  };
}

