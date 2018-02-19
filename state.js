function updateState(state, action) { //reducer
  if (action.type === 'INCREMENT') {
    return {count: state.count + action.amount};
  } else if (action.type === 'DECREMENT') {
    return {count: state.count - action.amount};
  } else {
    return state;
  }
}

class Store {
  constructor(updateState, state) { //updateState - ф-я для изменения состояния
    this._updateState = updateState;
    this._state = state;
    this._callbacks = []; //св-во для хранения списка ф-й
  }

  get state() {
    return this._state;
  }

  update(action) { //метод для взаимодействия с состоянием, action - объект действия
    this._state = this._updateState(this._state, action); //вызываем ф-ю updateState как this._updateState
    this._callbacks.forEach(callback => callback()); //вызываем каждую функцию в массиве
  }

  subscribe(callback) {
    this._callbacks.push(callback);
    return () => this._callbacks = this._callbacks.filter(cb => cb !== callback); //ф-я subscribe будет удялять ф-и, которую мы добавили в массив this._callbacks после ее вызова
  }
}

const initialState = {count: 0};

const store = new Store(updateState, initialState); //в конструктор передаем ф-ю updateState (выше) и state = 0

const incrementAction = {type: 'INCREMENT', amount: 5};
const decrementAction = {type: 'DECREMENT', amount: 3};

store.subscribe(() => console.log('State changed', store.state));  //получим 3 результата, потому что unsubscribe работает для State changed 1

store.update(incrementAction); //передаем action incrementAction в update
store.update(decrementAction);
store.update({});