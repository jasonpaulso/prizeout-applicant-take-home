import React from 'react';
import { PrizeoutOffer, PrizeoutOfferValueOptions } from '../../../slices/offers-slice';

import classNames from 'classnames';
import { formatCurrency } from './redemption-amount-grid';

const RedemptionSummary: React.FC<{ activeRedemptionOption: PrizeoutOfferValueOptions }> = ({
    activeRedemptionOption,
}): React.ReactElement => {
    console.log('activeRedemptionOption', activeRedemptionOption);
    return (
        <>
            {activeRedemptionOption ? (
                <div className={'redemption-summary'}>
                    <div className={'redemption-summary__row'}>
                        <span>Redemption Amount</span>
                        <span>{formatCurrency(activeRedemptionOption.cost_in_cents)}</span>
                    </div>
                    <div className={classNames('redemption-summary__row', 'emphasised')}>
                        <span>Prizeout Bonus ({activeRedemptionOption.display_bonus}%)</span>
                        <span>
                            {formatCurrency(
                                activeRedemptionOption.value_in_cents - activeRedemptionOption.cost_in_cents,
                            )}
                        </span>
                    </div>
                    <div className={'redemption-summary__row'}>
                        <span>You Get</span>
                        <span>{formatCurrency(activeRedemptionOption.value_in_cents)}</span>
                    </div>
                </div>
            ) : null}
        </>
    );
};

export default RedemptionSummary;
