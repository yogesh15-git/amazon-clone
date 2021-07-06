import Image from "next/image";
import { StarIcon } from '@heroicons/react/solid';
import Currency from 'react-currency-formatter';
import { addToBasket, removeFromBasket } from "../slices/basketSlice";
import { useDispatch } from 'react-redux';



function CheckoutProduct({
    id,
    title,
    price,
    description,
    category,
    image,
    rating,
    hasPrime
}) {
    const dispatch = useDispatch()

    const addItemToBasket = () => {
        const product = {
            id,
            title,
            price,
            description,
            category,
            image,
            rating,
            hasPrime
        }
        dispatch(addToBasket(product));

    }

    const removeItemFromBasket = () => {

        dispatch(removeFromBasket({ id }))
    }


    return (
        <div className="grid grid-cols-5">

            <Image src={image} height={200} width={200} objectFit="contain" />
            {/* Middle */}
            <div className="col-span-3 mx-5">
                <p>{title}</p>
                <div className="flex">
                    {Array(rating).fill().map((_, i) => (
                        <StarIcon className=" h-5 text-yellow-400" />
                    ))}
                </div>
                <p className="text-xs my-2 line-clamp-3">{description}</p>

                <Currency quantity={price} currency="GBP" />

                {hasPrime && (
                    <div className="flex items-center space-x-2">
                        <img className="w-12"
                            loading="lazy"
                            src="http://links.papareact.com/fdw"
                            alt=""

                        />
                        <p className="text-xs text-gray-500">FREE Delivery Next-Day</p>

                    </div>
                )}
            </div>
            {/*  Add and Remove Button */}
            <div className="flex flex-col space-y-2 my-auto justify-self-end">
                <button className="button" onClick={addItemToBasket}>Add To Basket</button>
                <button className="button" onClick={removeItemFromBasket} >Remove From Basket</button>

            </div>

        </div>
    )
}

export default CheckoutProduct
