import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import './Shipment.css'

const Shipment = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const onSubmit = data => {
        const saveCart = getDatabaseCart();
        const orderDetails = { ...loggedInUser, product: saveCart, shipment: data, orderTime: new Date() }

        fetch('https://emajhon-server.herokuapp.com/addOrder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderDetails)
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    processOrder();
                    alert('Placed order successfully')
                }
            })
    };


    return (
        < form className='shipForm' onSubmit={handleSubmit(onSubmit)} >
            < input name="name" defaultValue={loggedInUser.name} ref={register({ required: true })} placeholder='Enter your name' />
            { errors.name && <span className='error'>Name is required</span>}
            < input name="email" defaultValue={loggedInUser.email} ref={register({ required: true })} placeholder='Enter your email' />
            { errors.email && <span className='error'>Email is required</span>}
            < input name="address" ref={register({ required: true })} placeholder='Enter your address' />
            { errors.address && <span className='error'>Address is required</span>}
            < input name="phone" ref={register({ required: true })} placeholder='Enter your phone' />
            { errors.phone && <span className='error'>Phone is required</span>}

            <input type="submit" />
        </form >
    );
};

export default Shipment;