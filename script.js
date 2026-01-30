// Taxas do plano PREMIUM (Mais baratas)
const rates = {
    visa_master: {
        debit: 2.40, pix: 1.75,
        credit: [4.63, 6.04, 6.65, 7.25, 7.95, 8.65, 9.40, 10.15, 10.75, 11.25, 12.15, 12.65, 14.15, 14.86, 15.57, 16.28, 16.99, 17.70, 18.70, 19.40, 20.00]
    },
    elo: {
        debit: 3.05, pix: 1.75,
        credit: [5.10, 6.92, 7.54, 8.10, 8.80, 9.50, 10.25, 11.00, 11.75, 12.50, 13.00, 13.75, 14.87, 15.57, 16.27, 16.98, 17.68, 18.39, 19.09, 19.40, 20.10]
    },
    hiper: {
        debit: null, pix: 1.75,
        credit: [4.72, 6.62, 7.33, 8.33, 8.74, 9.93, 10.34, 11.04, 11.75, 12.75, 13.16, 14.34, 14.57, 15.27, 15.45, 16.68, 17.38, 18.56, 18.79, 19.95, 20.19]
    },
    amex: {
        debit: null, pix: 1.75,
        credit: [5.75, 7.12, 7.82, 8.53, 9.23, 9.35, 10.83, 11.53, 12.23, 12.94, 13.64, 13.86, 15.04, 15.75, 15.97, 17.15, 17.86, 18.09, 19.25, 19.49, 20.65]
    },
    cabal: {
        debit: 6.75, pix: 1.75,
        credit: [8.38, 9.02, 9.73, 10.44, 11.15, 11.85, 12.89, 13.59, 14.30, 15.00, 15.71, 16.41, 17.12, 17.82, 18.53, 19.23, 19.94, 20.64, null, null, null]
    }
};

// O restante do código é idêntico ao anterior...
// (Copie tudo que está abaixo de "const els = {" do script da versão PLUS e cole aqui)
const els = {
    amount: document.getElementById('amount'),
    brand: document.getElementById('brand'),
    method: document.getElementById('method'),
    installments: document.getElementById('installments'),
    passFees: document.getElementById('passFees'),
    receiveAmount: document.getElementById('receiveAmount'),
    chargeAmount: document.getElementById('chargeAmount')
};

function init() {
    els.installments.innerHTML = '';
    for (let i = 1; i <= 21; i++) {
        let opt = document.createElement('option');
        opt.value = i;
        opt.text = i + 'x';
        els.installments.appendChild(opt);
    }
    [els.amount, els.brand, els.method, els.installments, els.passFees].forEach(el => 
        el.addEventListener('input', calculate)
    );
    els.method.addEventListener('change', () => {
        els.installments.style.display = els.method.value === 'credit' ? 'block' : 'none';
        calculate();
    });
    calculate();
}

function calculate() {
    let amount = parseFloat(els.amount.value) || 0;
    let rate = 0;
    
    if (els.method.value === 'pix') rate = rates[els.brand.value].pix;
    else if (els.method.value === 'debit') rate = rates[els.brand.value].debit;
    else {
        let idx = parseInt(els.installments.value) - 1;
        let list = rates[els.brand.value].credit;
        if (list && list[idx] != null) rate = list[idx];
    }
    
    if (rate === null) rate = 0;

    let charge = amount;
    let receive = amount;

    if (els.passFees.checked) {
        charge = amount / (1 - (rate / 100));
        receive = amount;
    } else {
        receive = amount - (amount * (rate / 100));
    }

    els.receiveAmount.innerText = receive.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
    els.chargeAmount.innerText = charge.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
}

init();