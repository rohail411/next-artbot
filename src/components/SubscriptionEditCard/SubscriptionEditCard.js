import React from 'react';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import SubscriptionCard from '../SubscriptionCard/SubscriptionCard';
import { useDispatch } from 'react-redux';
import {
    removeSubscription,
    subscriptionChange,
    subscriptionEdit
} from '../../redux/actions/profile';
import dynamic from 'next/dynamic';
const CkEditor = dynamic(() => import('../UI/CkEditor/CkEditor'));

export default function SubscriptionEditCard({
    edit,
    index,
    item: { price, month, title, desc, _id }
}) {
    const dispatch = useDispatch();
    if (edit)
        return (
            <SubscriptionCard
                setEdit={() => dispatch(subscriptionEdit(!edit, index))}
                editable={true}
                className="subscription-edit-card"
                price={price}
                duration={month}
                title={title}
                desc={desc}
                _id={_id}
            />
        );
    return (
        <div className="p-3 m-1 rounded subscription-edit-card">
            <Input
                className="form-control text-center text-white mb-1 subscription-edit-card__price  bg-transparent monetization-textfeild"
                type="number"
                value={price}
                placeholder="$"
                name={`price-${index}`}
                onChange={(e) => dispatch(subscriptionChange(e))}
            />
            <Input
                className="form-control text-center  mb-1 subscription-edit-card__duration bg-transparent monetization-textfeild"
                type="number"
                min="1"
                max="12"
                value={month}
                name={`month-${index}`}
                onChange={(e) => dispatch(subscriptionChange(e))}
            />

            <Input
                className="form-control text-center text-white mb-1 subscription-edit-card__title bg-transparent monetization-textfeild"
                type="text"
                value={title}
                placeholder="Title"
                name={`title-${index}`}
                onChange={(e) => dispatch(subscriptionChange(e))}
            />
            <CkEditor
                data={desc}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    dispatch(
                        subscriptionChange({
                            target: {
                                name: `desc-${index}`,
                                value: data
                            }
                        })
                    );
                }}
            />

            {/* <FormInput
				placeholder="Description of tier benefits"
				inputType="textarea"
				value={desc}
				onChange={(e) => dispatch(subscriptionChange(e))}
				name={`desc-${index}`}
				className="monetization-textfeild subscription-edit-card__desc"
			/> */}
            <div className="d-flex mt-3 justify-content-center ">
                <Button
                    onClick={() => dispatch(subscriptionEdit(!edit, index))}
                    className={`btn btn-sm rounded-pill py-1 text-nowrap subscription-edit-card__btn bg-color-blue `}>
                    Done Editing
                </Button>
                <Button
                    onClick={() => dispatch(removeSubscription(index))}
                    className="btn btn-sm subscription-edit-card__btn rounded-pill py-1 text-white bg-dark">
                    Delete
                </Button>
            </div>
        </div>
    );
}
