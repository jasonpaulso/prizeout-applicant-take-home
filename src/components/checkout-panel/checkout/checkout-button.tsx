import React from 'react';
import { useDispatch } from 'react-redux';
import SelectedOfferValueContext, { SelectedOfferValueContextValue } from '../../../contexts/selectedOfferValueContext';
import { setCheckoutView } from '../../../slices/checkout-slice';
import { PrizeoutOfferValueOptions } from '../../../slices/offers-slice';
import { AppDispatch } from '../../../store';
import { Button } from '../../common';

// note: I am not sure that all of this functionality _should_ be in this component, but I as instructions suggested to put it here, I did.

const CheckoutButton: React.FC = (): React.ReactElement => {
    const { activeOfferValue, setActiveOfferValue } =
        React.useContext<SelectedOfferValueContextValue>(SelectedOfferValueContext);
    const [loading, setLoading] = React.useState(false);

    const buttonText = 'Prizeout Gift Card';

    const dispatch = useDispatch<AppDispatch>();

    const handleCheckout = (offer: PrizeoutOfferValueOptions): Promise<{ success: boolean; message: string }> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                // Helper function to validate required properties
                const validateProperty = (property: any, propertyName: string): boolean => {
                    if (!property) {
                        const response = {
                            message: `Please provide the ${propertyName}.`,
                            success: false,
                        };
                        console.log(response);
                        resolve(response);
                        return false;
                    }
                    return true;
                };

                // Data validation
                const isValid =
                    validateProperty(offer.checkout_value_id, 'checkout value ID') &&
                    validateProperty(offer.cost_in_cents, 'cost in cents') &&
                    validateProperty(offer.value_in_cents, 'value in cents');

                if (!isValid) {
                    return;
                }

                const response = {
                    message: 'Order placed successfully.',
                    success: true,
                };
                console.log(response);
                resolve(response);
            }, 1000); // Simulating a 1-second delay
        });
    };

    const buttonHandler = async (): Promise<void> => {
        setLoading(true);
        try {
            const response = await handleCheckout(activeOfferValue);

            if (response.success) {
                // Server response indicates successful order placement
                console.log('Order placed successfully.');
                setActiveOfferValue(null);
                dispatch(setCheckoutView('checkout-confirmation'));
            } else {
                // Server response indicates an error
                console.error('Order placement failed:', response.message);
                // Perform error handling or display error message to the user
            }
        } catch (error) {
            // Error occurred during the checkout process
            console.error('Error during checkout:', error);
            // Perform error handling or display error message to the user
        }
        setLoading(false);
    };

    return (
        <>
            <Button
                ariaLabel="Prizeout your gift card"
                color={`primary`}
                onClick={buttonHandler}
                size="medium"
                text={buttonText}
                type="submit"
                isDisabled={!activeOfferValue}
                isLoading={loading}
            />
        </>
    );
};

export default CheckoutButton;
