import { select, call, put, all, takeLatest } from 'redux-saga/effects';
import { addReserveSuccess, updateAmountSuccess } from './actions';

import api from '../../../services/api';
import history from '../../../services/history';

function* addToReserve({ id }){

    // Verifica se a reserva já existe na lista
    const tripExists = yield select(
        state => state.reserve.find(trip => trip.id === id)
    );

    // Verifica se existe em stock a quantidade de reserva necessária para poder
    // solicitar a reserva
    const myStock = yield call(api.get,`/stock/${id}`);

    const stockAmount = myStock.data.amount;

    const currentStock = tripExists ? tripExists.amount : 0;

    const amount = currentStock + 1;

    if ( amount > stockAmount){
        alert("Quantidade Máxima Atingida!!!")
        return;
    }
    
    if (tripExists){
        // Aumentar o amount...
        yield put(updateAmountSuccess(id, amount));
    
    }else{
        const response = yield call(api.get, `trips/${id}`);

        const data = {
            ...response.data,
            amount: 1
        };

        yield put(addReserveSuccess(data));

        //history.push('/reservas');
    }

}

function* updateAmount({id, amount}){

    if (amount <= 0) return;

    // Verifica se existe em stock a quantidade de reserva necessária para poder
    // solicitar a reserva
    const myStock = yield call(api.get,`/stock/${id}`);

    const stockAmount = myStock.data.amount;

    if ( amount > stockAmount){
        alert("Quantidade Máxima Atingida!!!")
        return;
    }

    yield put(updateAmountSuccess(id, amount));
    
}

export default all([
    takeLatest('ADD_RESERVE_REQUEST', addToReserve),
    takeLatest('UPDATE_RESERVE_REQUEST', updateAmount),
]);