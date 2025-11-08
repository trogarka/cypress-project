import { BaseBasket } from "./base_basket";

export class BasketStepTwo extends BaseBasket {
    static readonly selectors = {
        ...BaseBasket.selectors,
        envelope: '[data-qa="snippet--basket-transport-step"]',
        deliveryBtn: 'button',
        radioBtn: '.basket-item__radio',

        delivery: {
            input: '.form-group',
            date: '[data-qa="snippet--home-delivery-results"] [data-target="#hd-result-timeslots-1"]',
            time: '#hd-result-timeslots-1 > div:nth-child(1) > label > span.input > input',
            services: '[data-qa="snippet--basket-transport-services"] [name="service[xxxx]"]',
        },

        payments: {
            selectPayment: '.basket-item__radio--selected',
            img: '.basket-payment-item__logo img',
            description: '.basket-payment-item__name',
            price: '.basket-payment-item__price',
            box: '.basket-payment__wrapper',
            toolTip: '.basket-payment-item__hint',
        },

        selectDelivery: {
            leftSide: '.basket-box-delivery__left',
            center: '.basket-box-delivery__center',
            rightSide: '.basket-box-delivery__right',
        }
    }

    model = BasketStepTwo.selectors
}

export const basketStepTwo = new BasketStepTwo()