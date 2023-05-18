import Classnames from 'classnames';
import React from 'react';
import { CheckoutPanel } from '../../../../components/checkout-panel/checkout-panel';
import { Footer, Header } from '../../../../components/common';
import { withSelectedOfferContext } from '../../../../contexts/SelectedOfferContext';
import { useAppSelector } from '../../../../hooks';
import { selectIsCheckoutPanelCollapsed } from '../../../../slices/common-slice';
import DisplayOffers from '../offers/display-offers';
import './dashboard.less';

const Dashboard: React.FC = (): React.ReactElement => {
    const isCheckoutPanelCollapsedView = useAppSelector(selectIsCheckoutPanelCollapsed);
    const classes = Classnames('dashboard__wrapper', {
        'dashboard__wrapper--checkout-panel-collapsed-view': isCheckoutPanelCollapsedView,
    });

    return (
        <>
            <div className="dashboard">
                <Header />
                <div className={classes}>
                    <section className="dashboard__content no-scrollbars">
                        <div className="dashboard__inner">
                            <DisplayOffers />
                        </div>
                        <Footer />
                    </section>
                    <CheckoutPanel />
                </div>
            </div>
        </>
    );
};

export default withSelectedOfferContext(Dashboard);
