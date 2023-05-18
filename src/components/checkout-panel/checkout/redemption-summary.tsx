import React from 'react';

import classNames from 'classnames';
import SelectedOfferValueContext, { SelectedOfferValueContextValue } from '../../../contexts/selectedOfferValueContext';
import { formatCurrency } from './redemption-amount-grid';

const RedemptionSummary: React.FC = (): React.ReactElement => {
    const { activeOfferValue } = React.useContext<SelectedOfferValueContextValue>(SelectedOfferValueContext);

    const { cost_in_cents, value_in_cents, display_bonus } = activeOfferValue;
    const bonus = value_in_cents - cost_in_cents;

    return (
        <>
            {activeOfferValue ? (
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
