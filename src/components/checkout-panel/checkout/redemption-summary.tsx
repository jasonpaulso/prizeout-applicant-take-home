import React from 'react';
import { PrizeoutOfferValueOptions } from '../../../slices/offers-slice';

import classNames from 'classnames';
import { formatCurrency } from './redemption-amount-grid';

const RedemptionSummary: React.FC<{ activeRedemptionOption: PrizeoutOfferValueOptions }> = ({
    activeRedemptionOption,
}): React.ReactElement => {
    const { cost_in_cents, value_in_cents, display_bonus } = activeRedemptionOption;
    const bonus = value_in_cents - cost_in_cents;

    return (
        <>
            {activeRedemptionOption ? (
                <div className={'redemption-summary'}>
                    <div className={'redemption-summary__row'}>
                        <span>Redemption Amount</span>
                        <span>{formatCurrency(cost_in_cents)}</span>
                    </div>
                    {bonus ? (
                        <div className={classNames('redemption-summary__row', 'emphasised')}>
                            <span>Prizeout Bonus ({display_bonus}%)</span>
                            <span>{formatCurrency(bonus)}</span>
                        </div>
                    ) : null}
                    <div className={'redemption-summary__row'}>
                        <span>You Get</span>
                        <span>{formatCurrency(value_in_cents)}</span>
                    </div>
                </div>
            ) : null}
        </>
    );
};

export default RedemptionSummary;
