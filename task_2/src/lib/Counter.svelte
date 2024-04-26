<script lang="ts">
    interface APIBack {
        result: string;
        documentation: string;
        terms_of_use: string;
        time_last_update_unix: number;
        time_last_update_utc: string;
        time_next_update_unix: number;
        time_next_update_utc: string;
        base_code: string;
        conversion_rates: { [key: string]: number };
    }

    interface IState {
        currencyFrom: string;
        currencyTo: string;
        valueUser: number;
        valueConverted: number;
        valueFromOne: number;
        error: boolean;
    }

    const state: IState = {
        currencyFrom: "USD",
        currencyTo: "RUB",
        valueUser: 1,
        valueConverted: 0,
        valueFromOne: 0,
        error: false
    }

    async function convertCurrency() {
        try {
            if (state.currencyFrom.length === 3 && state.currencyTo.length === 3) {
                state.error = false;
                const response = await fetch(`https://v6.exchangerate-api.com/v6/bf0162b6eae4a2a6b635d9bd/latest/${state.currencyFrom.toUpperCase()}`);
                const data: APIBack = await response.json();
                state.valueFromOne = data.conversion_rates[state.currencyTo.toUpperCase()];
                state.valueConverted = state.valueUser * state.valueFromOne;
            }
        } catch (error) {
            state.error = true;
        }
    }

    convertCurrency();
</script>

<main>
    <div class="title">Exchange with API</div>
    {#if state.error}
        <span class="errorText">Ошибка</span>
    {/if}
    <div>
        <span>From</span>
        <input type="text" bind:value={state.currencyFrom}
               on:input={convertCurrency}/>
    </div>
    <div>
        <span>To</span>
        <input type="text" bind:value={state.currencyTo}
               on:input={convertCurrency}/>
    </div>
    <div>
        <span>Value</span>
        <input min="0" type="number" bind:value={state.valueUser}
               on:input={convertCurrency}/>
    </div>
    <div>
        <span>Converted</span>
        <span>{state.valueConverted}</span>
    </div>
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: start;
        gap: 20px;
    }

    div {
        display: flex;
        width: 300px;
        justify-content: space-between;
        align-items: center;
    }

    span {
        font-size: 12px;
    }

    .title {
        align-self: center;
        text-align: center;
        font-size: 32px;
    }

    input {
        text-transform: uppercase;
    }

    .errorText {
        color: red;
        font-size: 12px;
    }

</style>
