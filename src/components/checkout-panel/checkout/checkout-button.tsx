import React from 'react';
import { Button } from '../../common';

const CheckoutButton: React.FC<{ disabled: boolean }> = ({ disabled }): React.ReactElement => {
    const buttonText = 'Prizeout Gift Card';
    const buttonHandler = () => {
        // Checkout logic here
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
                isDisabled={disabled}
            />
        </>
    );
};

export default CheckoutButton;
