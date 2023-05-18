import React from 'react';
import { PrizeoutOffer } from '../../../slices/offers-slice';

import classNames from 'classnames';
import SelectedOfferValueContext, { SelectedOfferValueContextValue } from '../../../contexts/selectedOfferValueContext';

const RedemptionAmountGrid: React.FC<{
    offer: PrizeoutOffer;
}> = ({ offer }): React.ReactElement => {
    const { giftcard_list } = offer;
    const { activeOfferValue, setActiveOfferValue } =
        React.useContext<SelectedOfferValueContextValue>(SelectedOfferValueContext);

    return (
        <div className={'redemption-grid-wrapper'}>
            <h4>Select Redemption Amount</h4>
            <div className={'redemption-grid'}>
                {giftcard_list.map((giftCard) => {
                    const { cost_in_cents, checkout_value_id } = giftCard;

                    return (
                        <button
                            key={checkout_value_id}
                            className={classNames('redemption-grid__item', {
                                'redemption-grid__item__selected': activeOfferValue === giftCard,
                            })}
                            onClick={() => setActiveOfferValue(giftCard)}
                        >
                            {formatCurrency(cost_in_cents)}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default RedemptionAmountGrid;

export const formatCurrency = (cents: number): string => {
    const dollars = Math.floor(cents / 100);
    const remainingCents = cents % 100;
    const formattedCents = remainingCents < 10 ? `0${remainingCents}` : `${remainingCents}`;

    return `$${dollars}.${formattedCents}`;
};
