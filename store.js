function updateState(state, action) { //reducer
  if (action.type === 'INCREMENT') {
    return state + action.amount;
  } else if (action.type === 'DECREMENT') {
    return state - action.amount;
  } else {
    return state;
  }
}

class Store {
  constructor(updateState, state) { //updateState - ф-я для изменения состояния
    this._updateState = updateState;
    this._state = state;
  }

  get state() {
    return this._state;
  }

  update(action) { //метод для взаимодействия с состоянием, action - объект действия
    this._state = this._updateState(this._state, action); //вызываем ф-ю updateState как this._updateState
  }
}

const store = new Store(updateState, 0); //в конструктор передаем ф-ю updateState (выше) и state = 0

const incrementAction = {type: 'INCREMENT', amount: 5};
const decrementAction = {type: 'DECREMENT', amount: 3};

store.update(incrementAction); //передаем action incrementAction в update
console.log(store.state);

store.update(decrementAction);
console.log(store.state);

store.update({});
console.log(store.state);