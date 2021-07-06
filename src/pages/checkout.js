import Image from "next/image";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import { selectItems, totalItemsPrice } from "../slices/basketSlice";
import CheckoutProduct from "../components/CheckoutProduct";
import { useSession } from 'next-auth/client';
import Currency from "react-currency-formatter";
import { loadStripe } from '@stripe/stripe-js';
import axios from "axios";
const stripePromise = loadStripe(process.env.stripe_public_key);

function Checkout() {
    const items = useSelector(selectItems);
    const totalPrice = useSelector(totalItemsPrice);
    const [session] = useSession()

    const createCheckoutSession = async () => {
        const stripe = await stripePromise;

        // Call backend to create checkout session
        const checkoutSession = await axios.post('/api/create-checkout-session',
            {
                items,
                email: session.user.email
            });

        //Redirect user/customer to stripe checkout
        const result = await stripe.redirectToCheckout({
            sessionId: checkoutSession.data.id,
        })

        if (result.error) {
            alert(result.error.message);
        }
    }


    return (
        <div className="bg-gray-100">
            <Header />
            <main className="lg:flex max-w-screen-2xl mx-auto">
                {/* Left */}
                <div className="flex-grow m-5 shadow-sm">
                    <Image
                        src="http://links.papareact.com/ikj"
                        width={1020}
                        height={250}
                        objectFit="contain"
                    />

                    <div className="flex flex-col p-5 space-y-5  bg-white ">
                        <h1 className="text-3xl border-b pb-4">
                            {items.length === 0 ? 'Your Amazon Basket is empty!' : 'Shopping Basket'}
                        </h1>
                        {items.map((data, i) => (
                            <CheckoutProduct
                                key={i}
                                id={data.id}
                                title={data.title}
                                price={data.price}
                                description={data.description}
                                category={data.category}
                                image={data.image}
                                rating={data.rating}
                                hasPrime={data.hasPrime}
                            />
                        ))}



                    </div>

                </div>

                {/* Right */}

                <div className="flex flex-col bg-white p-10 shadow-md">
                    {items.length >= 0 && (
                        <>
                            <h1 className="whitespace-nowrap">SubTotal ({items.length} items):{" "}
                                <span className="font-bold">
                                    <Currency quantity={totalPrice} currency="GBP" />
                                </span>
                            </h1>
                            <button
                                role="link"
                                onClick={createCheckoutSession}
                                disabled={!session}
                                className={`button mt-2 ${!session && "from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed"}`}>
                                {!session ? 'Sign in to checkout' : 'Proceed to checkout'}</button>
                        </>
                    )}
                </div>


            </main>
        </div>
    )
}

export default Checkout
