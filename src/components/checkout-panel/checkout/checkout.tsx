import React from 'react';
import checkoutPanelViewWrapper from '../view-wrapper';
import CheckoutButton from './checkout-button';

import './checkout.less';
import SelectedOfferContext, { SelectedOfferContextValue } from '../../../contexts/SelectedOfferContext';
import RedemptionAmountGrid from './redemption-amount-grid';
import { PrizeoutOfferValueOptions } from '../../../slices/offers-slice';
import RedemptionSummary from './redemption-summary';
import { selectIsCollapsedCheckoutPanelOpen } from '../../../slices/checkout-slice';
import { useAppSelector } from '../../../hooks';

const CheckoutPanelView: React.FC = (): React.ReactElement => {
    const { activeOffer } = React.useContext<SelectedOfferContextValue>(SelectedOfferContext);
    const [activeRedemptionOption, setActiveRedemptionOption] = React.useState<PrizeoutOfferValueOptions | null>(null);
    const isCollapsedCheckoutPanelOpen = useAppSelector(selectIsCollapsedCheckoutPanelOpen);

    React.useEffect(() => {
        if (!isCollapsedCheckoutPanelOpen) {
            setActiveRedemptionOption(null);
        }
    }, [isCollapsedCheckoutPanelOpen]);

    return (
        <section className="checkout">
            <div className="grid grid--top-bottom grid--stretch-top">
                <div className="grid__item">
                    <section className="checkout__brand">
                        {/* reconsider this section, mabe make it a title */}
                        <h2>{activeOffer ? activeOffer.name : 'Select a Gift Card to view redemption amounts'}</h2>
                        {activeOffer ? (
                            <>
                                <RedemptionAmountGrid
                                    offer={activeOffer}
                                    activeRedemptionOption={activeRedemptionOption}
                                    setActiveRedemptionOption={setActiveRedemptionOption}
                                />
                                {activeRedemptionOption ? (
                                    <RedemptionSummary activeRedemptionOption={activeRedemptionOption} />
                                ) : null}
                            </>
                        ) : null}
                    </section>
                </div>
                <div className="grid__item">
                    <section className="checkout__calculation">
                        {/* change this behavour to check for selected offer amount */}
                        <CheckoutButton disabled={!activeRedemptionOption} />
                    </section>
                </div>
            </div>
        </section>
    );
};

export default checkoutPanelViewWrapper(CheckoutPanelView, 'checkout');
