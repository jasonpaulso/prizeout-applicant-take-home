import React from 'react';
import { PrizeoutOffer, PrizeoutOfferValueOptions } from '../../../slices/offers-slice';

import classNames from 'classnames';

const RedemptionAmountGrid: React.FC<{
    offer: PrizeoutOffer;
    setActiveRedemptionOption: (valueOption: PrizeoutOfferValueOptions) => void;
    activeRedemptionOption: PrizeoutOfferValueOptions;
}> = ({ offer, activeRedemptionOption, setActiveRedemptionOption }): React.ReactElement => {
    return (
        <div className={'redemption-grid-wrapper'}>
            <h4>Select Redemption Amount</h4>
            <div className={'redemption-grid'}>
                {offer.giftcard_list.map((giftCard) => (
                    <button
                        key={giftCard.checkout_value_id}
                        className={classNames('redemption-grid__item', {
                            'redemption-grid__item__selected': activeRedemptionOption === giftCard,
                        })}
                        onClick={() => setActiveRedemptionOption(giftCard)}
                    >
                        {formatCurrency(giftCard.cost_in_cents)}
                    </button>
                ))}
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
