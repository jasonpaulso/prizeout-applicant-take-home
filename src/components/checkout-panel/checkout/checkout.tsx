import React from 'react';
import checkoutPanelViewWrapper from '../view-wrapper';
import CheckoutButton from './checkout-button';

import SelectedOfferContext, { SelectedOfferContextValue } from '../../../contexts/SelectedOfferContext';
import SelectedOfferValueContext, {
    SelectedOfferValueContextValue,
    withSelectedOfferValueContext,
} from '../../../contexts/selectedOfferValueContext';
import { useAppSelector } from '../../../hooks';
import { selectIsCollapsedCheckoutPanelOpen } from '../../../slices/checkout-slice';
import './checkout.less';
import RedemptionAmountGrid from './redemption-amount-grid';
import RedemptionSummary from './redemption-summary';

const CheckoutPanelView: React.FC = (): React.ReactElement => {
    const { activeOffer } = React.useContext<SelectedOfferContextValue>(SelectedOfferContext);

    const { activeOfferValue, setActiveOfferValue } =
        React.useContext<SelectedOfferValueContextValue>(SelectedOfferValueContext);

    const isCollapsedCheckoutPanelOpen = useAppSelector(selectIsCollapsedCheckoutPanelOpen);

    React.useEffect(() => {
        if (!isCollapsedCheckoutPanelOpen) {
            setActiveOfferValue(null);
        }
    }, [isCollapsedCheckoutPanelOpen]);

    React.useEffect(() => {
        setActiveOfferValue(null);
    }, [activeOffer]);

    return (
        <section className="checkout">
            <div className="grid grid--top-bottom grid--stretch-top">
                <div className="grid__item">
                    <section className="checkout__brand">
                        <h2>{activeOffer ? activeOffer.name : 'Select a Gift Card to view redemption amounts'}</h2>
                        {activeOffer ? (
                            <>
                                <RedemptionAmountGrid offer={activeOffer} />
                                {activeOfferValue ? <RedemptionSummary /> : null}
                            </>
                        ) : null}
                    </section>
                </div>
                <div className="grid__item">
                    <section className="checkout__calculation">
                        <CheckoutButton />
                    </section>
                </div>
            </div>
        </section>
    );
};

export default withSelectedOfferValueContext(checkoutPanelViewWrapper(CheckoutPanelView, 'checkout'));
